"use strict";
var fs_1 = require("fs");
var ramda_1 = require("ramda");
var actions_1 = require("./actions");
var effects_1 = require("./effects");
var reducer_1 = require("./reducer");
var actions = [
    { name: 'foo', effectful: false, selected: false },
    { name: 'bar', effectful: true, selected: false }
];
var files = {
    actions: actions_1.writeActions(actions),
    effects: effects_1["default"](actions),
    reducer: reducer_1["default"](actions)
};
try {
    ramda_1.forEach(function (_a) {
        var filename = _a[0], contents = _a[1];
        return fs_1.writeFileSync(process.cwd() + "/out/" + filename + ".js", contents);
    }, ramda_1.toPairs(files));
}
catch (e) {
    console.error(e.stack);
}
