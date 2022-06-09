const path = require("path");

module.exports = {
    mode: "production",
    watch: true,
    target: "web",
    entry: "./examples/app.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "examples"),
        globalObject: "this",
    },
};
