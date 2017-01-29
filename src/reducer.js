"use strict";
var esprima_1 = require("esprima");
var ramda_1 = require("ramda");
var templates_1 = require("./templates");
function makeReducer(actionName) {
    return {
        type: esprima_1.Syntax.SwitchCase,
        test: {
            type: esprima_1.Syntax.Literal,
            value: actionName
        },
        consequent: [
            {
                type: esprima_1.Syntax.ReturnStatement,
                argument: {
                    type: esprima_1.Syntax.Identifier,
                    name: 'state'
                }
            }
        ]
    };
}
var reducer = function (actions) { return ({
    type: esprima_1.Syntax.FunctionExpression,
    id: null,
    params: [
        { type: esprima_1.Syntax.Identifier, name: 'state' },
        { type: esprima_1.Syntax.Identifier, name: 'action' }
    ],
    body: {
        type: esprima_1.Syntax.BlockStatement,
        body: [
            {
                type: esprima_1.Syntax.SwitchStatement,
                discriminant: {
                    type: esprima_1.Syntax.MemberExpression,
                    object: {
                        type: esprima_1.Syntax.Identifier,
                        name: 'action'
                    },
                    property: {
                        type: esprima_1.Syntax.Identifier,
                        name: 'type'
                    }
                },
                cases: ramda_1.append({
                    type: esprima_1.Syntax.SwitchCase,
                    test: null,
                    consequent: [{
                            type: esprima_1.Syntax.ReturnStatement,
                            argument: templates_1.id('state')
                        }]
                }, ramda_1.map(function (_a) {
                    var name = _a.name;
                    return makeReducer(name);
                }, actions))
            }
        ]
    }
}); };
function default_1(actions) {
    return templates_1.program(reducer(actions));
}
exports.__esModule = true;
exports["default"] = default_1;
