"use strict";
var escodegen_1 = require("escodegen");
var esprima_1 = require("esprima");
exports.id = function (name) { return ({
    type: esprima_1.Syntax.Identifier,
    name: name
}); };
exports.literal = function (value) { return ({
    type: esprima_1.Syntax.Literal,
    value: value
}); };
exports.block = function (body) { return ({
    type: esprima_1.Syntax.BlockStatement,
    body: body
}); };
exports.program = function (defaultExport) {
    return escodegen_1.generate({
        type: esprima_1.Syntax.Program,
        body: [
            {
                type: esprima_1.Syntax.ExportDefaultDeclaration,
                declaration: defaultExport
            }
        ],
        sourceType: 'script',
        leadingComments: [{
                type: 'Line',
                value: ' @flow'
            }]
    }, {
        comment: true,
        format: {
            indent: {
                style: '  '
            }
        }
    });
};
