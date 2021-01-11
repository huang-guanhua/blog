const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./webpack.base');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = merge(base, {
  mode: 'production',

  output: {
    path: path.resolve(process.cwd(), 'blog'),
    filename: '[name]_[chunkhash:8].js',
    // publicPath: '/assets/'
  },

  plugins: [
    
  ]
})