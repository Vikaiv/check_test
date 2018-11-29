# -*- coding: utf-8 -*-
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

discipline_schema = {
    "type": "object",
    "properties": {
        "number": {
            "type": "string"
        },
        "disciplineName": {
            "type": "string"
        },
        "elementaries": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "number": {
                  "type": "string"
                },
                "elementaryName": {
                  "type": "string"
                },
              },
              # "required": [
              #   "loc"
              # ]
            }
        },
        "email": {
            "type": "string",
            "format": "email"
        }
    },
    "required": ["email", "number", "disciplineName"],
    "additionalProperties": False
}

discipline_update_schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "payload": {
            "type": "object",
            "properties": {
              "number": {
                  "type": "string"
              },
              "disciplineName": {
                  "type": "string"
              },
              "elementaries": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "number": {
                        "type": "string"
                      },
                      "elementaryName": {
                        "type": "string"
                      },
                    },
                    # "required": [
                    #   "loc"
                    # ]
                  }
              },
            },
            "additionalProperties": False
        }
    },
    "required": ["id", "payload"],
    "additionalProperties": False
}


def validate_discipline_update(data):
    try:
        validate(data, discipline_update_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}


def validate_discipline(data):
    try:
        validate(data, discipline_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
