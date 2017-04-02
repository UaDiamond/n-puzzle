const webpack = require('webpack');
const path = require('path');


const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],

  externals: {
    jquery: 'jQuery'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },

  output: {
    filename: './public/assets/js/bundle.js',
    path: __dirname
  },

  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],

  resolve: {
    alias: {
      applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
      actions: path.resolve(__dirname, 'app/actions/actions.jsx'),
      reducers: path.resolve(__dirname, 'app/reducers/reducers.jsx'),
      configureStore: path.resolve(__dirname, 'app/store/configureStore.jsx')
    },
    extensions: ['.js', '.jsx'],
    modules: [
      './app/api',
      './app/components',
      'node_modules'
    ]
  }
};


module.exports = config;