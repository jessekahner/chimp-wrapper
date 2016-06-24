// for prod run wint NODE_ENV=production webpack -p  [p flag for extra optimization]

var webpack = require('webpack');
var path = require('path');

console.log();

module.exports = {
  target: "web",
  entry: __dirname + '/browser.js',

  output: {
    path: __dirname,
    filename: './browser-dist/chimp-wrapper.min.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false }
    })
  ],

  module:{
    loaders:[{
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      test: /\.js?$/,
      exclude: /(bower_components|node_modules)/
    }]
  },

  //devtool: 'cheap-module-eval-source-map'
}
