# -*- coding: utf-8 -*-
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

test_schema = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "question_type": {
                        "type": "string",
                        "enum": [
                            "С несколькими правильными ответами",
                            "С одним правильным ответом",
                            "На поиск соответствия",
                            "В свободной форме"
                        ]
                    },
                    "description": {
                        "type": "string"
                    },
                    "answer_variants": {
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
            "title": {
                "type": "string"
            },
            "questions": {
                "type": "array",
                "items": {
                    "properties": {
                        "question_type": {
                            "type": "string",
                            "enum": [
                                "С несколькими правильными ответами",
                                "С одним правильным ответом",
                                "На поиск соответствия",
                                "В свободной форме"
                            ]
                        },
                        "description": {
                            "type": "string"
                        },
                        "answer_variants": {
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
