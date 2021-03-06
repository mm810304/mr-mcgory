const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCSSPlugins = [
    require('postcss-import'),
    require('cssnano'),
    require('autoprefixer')
];

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.min.css'
        })
    ],
    entry: {
        multiquiz: './src/multiQuizIndex.js',
        demo: './src/demoIndex.js',
        timekiller: './src/timeKillerIndex.js',
        webquiz: './src/webQuizIndex.js',
        main: './src/main.js',
        mathspeed: './src/mathSpeedChallengeIndex.js',
        trivia: './src/triviaIndex.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: postCSSPlugins
                        }
                    }
                }
            ]
        }]
    }
};