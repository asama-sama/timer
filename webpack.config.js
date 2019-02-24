const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/semantic-ui")],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};