process.noDeprecation = true;
const webpack = require('webpack');

module.exports = {
    devtool: "source-map",
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "React": "React",
        "ReactDOM": "ReactDOM"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2016', 'react'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};