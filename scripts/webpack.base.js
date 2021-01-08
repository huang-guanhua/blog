const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.BABEL_ENV === 'development';
const isProd = process.env.BABEL_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  resolve:{
    alias: {
      src: path.resolve(process.cwd(), './src/')
    },
    extensions: [".vue", ".js"],
    mainFiles: ["index"]
  },
  module: {    
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: {
            postcssOptions: {
              plugins: [
                postcssPresetEnv({
                  stage: 4,
                  browsers: [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                  ]
                })
              ]
            }   
          } }
        ], 
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: {
            postcssOptions: {
              plugins: [
                postcssPresetEnv({
                  stage: 4,
                  browsers: [
                    ">0.2%",
                    "not dead",
                    "not op_mini all"
                  ]
                })
              ]
            }   
          } },
          'less-loader'
        ], 
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: isDev ? 'images/[name].[ext]' : 'images/[name].[hash].[ext]',
        }
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'G-blog',
      filename: 'index.html',
      favicon: path.resolve(process.cwd(),'./public/logo.png'),
      template: path.resolve(process.cwd(), './public/index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name]_[contenthash:8].css' : '[name].css'
    }),
    new VueLoaderPlugin()
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(process.cwd(), './public/logo.png'),
    //       to: path.resolve(process.cwd(), './dist/'),
    //     }
    //   ]
    // })
  ]
}