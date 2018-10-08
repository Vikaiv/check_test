''' controller and routes for tests '''
# -*- coding: utf-8 -*-
import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from app import app, mongo
from app.schemas import validate_test, validate_test_update
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route('/test', methods=['GET', 'POST', 'DELETE', 'PATCH'])
@jwt_required
def test():
    ''' route read tests '''
    if request.method == 'GET':
        query = request.args
        data = mongo.db.tests.find_one({'_id': ObjectId(query['id'])})
        return jsonify({'ok': True, 'data': data}), 200

    data = request.get_json()

    if request.method == 'POST':
        user = get_jwt_identity()
        LOG.debug(user)
        data = validate_test(data)
        if data['ok']:
            db_response = mongo.db.tests.insert_one(data['data'])
            return_data = mongo.db.tests.find_one(
                {'_id': db_response.inserted_id})
            return jsonify({'ok': True, 'data': return_data}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

    if request.method == 'DELETE':
        if data.get('id', None) is not None:
            db_response = mongo.db.tests.delete_one(
                {'_id': ObjectId(data['id'])})
            if db_response.deleted_count == 1:
                response = {'ok': True, 'message': 'record deleted'}
            else:
                response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

    if request.method == 'PATCH':
        data = validate_test_update(data)
        if data['ok']:
            data = data['data']
            mongo.db.tests.update_one(
                {'_id': ObjectId(data['id'])}, {'$set': data['payload']})
            return jsonify({'ok': True, 'message': 'record updated'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route('/tests', methods=['POST'])
@jwt_required
def list_tests():
    ''' route to get all the tests for a user '''
    user = get_jwt_identity()
    data = request.get_json()
    LOG.debug(data)
    # user = {'email': 'riken.mehta03@gmail.com'}
    if request.method == 'POST':
        query = request.args
        db_response = mongo.db.tests.find({'discipline': data['discipline']})
        if query.get('group', None):
            return_data = {}
            for test in db_response:
                try:
                    return_data[test['status']].append(test)
                except:
                    return_data[test['status']] = [test]
        else:
            return_data = list(db_response)
        return jsonify({'ok': True, 'data': return_data
})
