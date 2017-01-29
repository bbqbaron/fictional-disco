"use strict";
var esprima_1 = require("esprima");
var ramda_1 = require("ramda");
var templates_1 = require("./templates");
function makeAction(name) {
    return {
        type: esprima_1.Syntax.Property,
        key: { type: esprima_1.Syntax.Identifier, name: name },
        value: {
            type: esprima_1.Syntax.ArrowFunctionExpression,
            id: null,
            params: [{
                    type: esprima_1.Syntax.Identifier,
                    name: 'value'
                }],
            body: {
                type: esprima_1.Syntax.ObjectExpression,
                properties: [
                    {
                        type: esprima_1.Syntax.Property,
                        key: { type: esprima_1.Syntax.Identifier, name: 'type' },
                        value: { type: esprima_1.Syntax.Literal, value: name },
                        kind: 'init'
                    },
                    {
                        type: esprima_1.Syntax.Property,
                        key: { type: esprima_1.Syntax.Identifier, name: 'value' },
                        value: { type: esprima_1.Syntax.Identifier, name: 'value' },
                        kind: 'init',
                        shorthand: true
                    }
                ]
            }
        },
        kind: 'init'
    };
}
var makeActions = function (actionNames) { return ({
    type: esprima_1.Syntax.ObjectExpression,
    properties: actionNames.map(makeAction)
}); };
function writeActions(actions) {
    return templates_1.program(makeActions(ramda_1.map(function (_a) {
        var name = _a.name;
        return name;
    }, actions)));
}
exports.writeActions = writeActions;
