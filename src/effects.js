"use strict";
var esprima_1 = require("esprima");
var ramda_1 = require("ramda");
var templates_1 = require("./templates");
var taker = function (action) { return ({
    type: esprima_1.Syntax.YieldExpression,
    argument: {
        type: esprima_1.Syntax.CallExpression,
        callee: templates_1.id('takeEvery'),
        arguments: [
            templates_1.id(action.name),
            templates_1.literal("_" + action.name)
        ]
    }
}); };
var makeSaga = function (actions) {
    return ({
        type: esprima_1.Syntax.FunctionExpression,
        generator: true,
        id: null,
        params: [],
        body: templates_1.block(ramda_1.map(taker, actions))
    });
};
function default_1(actions) {
    return templates_1.program(makeSaga(ramda_1.filter(function (_a) {
        var effectful = _a.effectful;
        return effectful;
    }, actions)));
}
exports.__esModule = true;
exports["default"] = default_1;
