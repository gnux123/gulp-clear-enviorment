process.noDeprecation = true;

module.exports = {
    devtool: "source-map",
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
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            }
        ]
    }
};