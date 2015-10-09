var path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "webservice.js",
        library: "webService",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.(js)?$/,
                loader: 'babel?stage=0',
                exclude: /node_modules/
            }
        ]
    }
};
