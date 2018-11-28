''' controller and routes for tasks '''
import os
from flask import request, jsonify, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from app import app, mongo
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

PUBLIC_PATH = os.path.join(ROOT_PATH, 'public')

@app.route('/results')
def results():
    ''' route read results '''
    print (PUBLIC_PATH)
    return send_from_directory(PUBLIC_PATH, 'index.html')