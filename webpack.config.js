module.exports = {
    entry: "./public/app/main.js",
    output: {
        path: __dirname + '/public/dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    node: {
        fs: "empty"
    }
};