import operator

OPERATORS = {
    0: {
        'name': '+',
        'value': ['+'],
        'function': operator.add
    },
    1: {
        'name': '–',
        'value': ['-'],
        'function': operator.sub
    },
    2: {
        'name': '×',
        'value': ['*', 'x'],
        'function': operator.mul
    },
    3: {
        'name': '÷',
        'value': ['/'],
        'function': operator.truediv
    },
    4: {
        'name': '=',
        'value': ['='],
        'function': None
    }
}
