var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')

module.exports = {
    context : __dirname,
    mode: 'development',
    devtool: false,
    entry: {
       client: "./public/js/client.js",
       user: "./public/js/user.js",
       profile : "./public/js/profile.js"
    },
    module : {
        rules : [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets : ['react', 'es2015', 'stage-0'],
                    plugins : ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']

                }
            }
        ]
    },
    output : {
        path : __dirname + '/public/js',
        filename: '[name].min.js'
    },


    plugins : debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle:false, sourcemap:false})

    ]
};