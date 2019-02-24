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
          path.resolve(__dirname, "src")],
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: 
              {
                modules: true, 
                importLoaders: 1,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
              } 
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [
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