const path = require('path');
const webpack = require('webpack');



module.exports = {
    entry:{
       app: './app/index'
    },
    output:{
        path: path.join(__dirname, '/public/js'),
        publicPath: "/",
        filename: '[name].bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude:'/node_modules',
                loader:'babel-loader',
                query: {
                    presets: ['latest', 'react', 'es2015']
                }
            },
            {test: /\.css$/, loader:'style-loader!css-loader'}
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}