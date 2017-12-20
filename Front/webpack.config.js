const path = require('path')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, 'app', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  //devServer: {
   // hot: true
  //},
  plugins: [
//    new CleanWebpackPlugin(['dist']),
//    new HtmlWebpackPlugin({
//      title: 'Output Management'
//    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
}