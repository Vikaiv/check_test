''' controller and routes for disciplines '''
# -*- coding: utf-8 -*-
import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from app import app, mongo
from app.schemas import validate_discipline, validate_discipline_update
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route('/discipline', methods=['GET', 'POST', 'DELETE', 'PATCH'])
@jwt_required
def discipline():
    ''' route read disciplines '''
    if request.method == 'GET':
        query = request.args
        data = mongo.db.disciplines.find_one({'_id': ObjectId(query['id'])})
        return jsonify({'ok': True, 'data': data}), 200

    data = request.get_json()

    if request.method == 'POST':
        user = get_jwt_identity()
        LOG.debug(user)
        data = validate_discipline(data)
        if data['ok']:
            db_response = mongo.db.disciplines.insert_one(data['data'])
            return_data = mongo.db.disciplines.find_one(
                {'_id': db_response.inserted_id})
            return jsonify({'ok': True, 'data': return_data}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

    if request.method == 'DELETE':
        LOG.debug(data)
        if data.get('id', None) is not None:
            db_response = mongo.db.disciplines.delete_one(
                {'_id': ObjectId(data['id'])})
            if db_response.deleted_count == 1:
                response = {'ok': True, 'message': 'record deleted'}
            else:
                response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

    if request.method == 'PATCH':
        data = validate_discipline_update(data)
        if data['ok']:
            data = data['data']
            mongo.db.disciplines.update_one(
                {'_id': ObjectId(data['id'])}, {'$set': data['payload']})
            return jsonify({'ok': True, 'message': 'record updated'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route('/list/discipline', methods=['GET'])
@jwt_required
def list_disciplines():
    ''' route to get all the disciplines for a user '''
    user = get_jwt_identity()
    # LOG.debug(user)
    # user = {'email': 'riken.mehta03@gmail.com'}
    if request.method == 'GET':
        query = request.args
        data = mongo.db.disciplines.find({'email': user['email']})
        if query.get('group', None):
            return_data = {}
            for discipline in data:
                try:
                    return_data[discipline['status']].append(discipline)
                    LOG.debug(discipline)
                except:
                    return_data[discipline['status']] = [discipline]
        else:
            return_data = list(data)
            LOG.debug(data)
        return jsonify({'ok': True, 'data': return_data})
