# -*- coding: utf-8 -*-
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

test_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": [
                            "alternativeChoice",
                                "multipleChoice",
                                "matching",
                                "sequencing",
                                "briefAnswer",
                                "essay"
                        ]
                    },
                    "description": {
                        "type": "string"
                    },
                    "answerVariants": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "right_answer": {
                        "type":"string"
                    }
                }
            },
        },
        "discipline": {
            "type": "string",
        }
    },
}
    
test_update_schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "payload": {
            "name": {
                "type": "string"
            },
            "questions": {
                "type": "array",
                "items": {
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "alternativeChoice",
                                "multipleChoice",
                                "matching",
                                "sequencing",
                                "briefAnswer",
                                "essay"
                            ]
                        },
                        "description": {
                            "type": "string"
                        },
                        "answerVariants": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "right_answer": {
                            "type":"string"
                        }
                    }
                },
            },
            "discipline": {
                "type": "string",
            }
        },
    },
    "required": ["id", "payload"],
    "additionalProperties": False
}


def validate_test_update(data):
    try:
        validate(data, test_update_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}


def validate_test(data):
    try:
        validate(data, test_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}
