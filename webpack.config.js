const path = require("path");

module.exports = {
    mode: "production",
    watch: true,
    target: "web",
    entry: "./dist/index.js",
    output: {
        filename: "component.js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "this",
    },
};
