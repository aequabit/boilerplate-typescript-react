const path = require('path');
const webpack = require('webpack');

const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;

module.exports = {
    mode: IS_DEV_SERVER ? 'development' : 'production',
    entry: {
        bundle: path.resolve(__dirname, 'src')
    },
    devtool: IS_DEV_SERVER ? 'eval' : 'source-map',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'app'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|svg|png|jpg|ttf|gif)$/,
                use: 'url-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                options: {
                    configFile: path.join(__dirname, 'tslint.json'),
                    emitErrors: true,
                    failOnHint: true,
                    typeCheck: true,
                    tsConfigFile: path.join(__dirname, 'tsconfig.json')
                }
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 3333,
        hot: true,
        inline: true,
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        open: false
    },
    plugins: IS_DEV_SERVER
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
              new webpack.DefinePlugin({
                  'process.env': {
                      NODE_ENV: JSON.stringify('production'),
                      BUILD: JSON.stringify('build')
                  }
              })
          ]
};

