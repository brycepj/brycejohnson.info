const path = require('path');

module.exports = {
  entry: './src/javascripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs/assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
