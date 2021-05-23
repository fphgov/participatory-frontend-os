const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: [ 'babel-polyfill', './src/index.js' ],
    admin: [ 'babel-polyfill', './admin/index.js' ]
  },
  resolve: {
    extensions: [ '.js', '.css', '.scss' ],
    alias: {
      normalize: path.join(__dirname, '/node_modules/normalize.css'),
      grid: path.join(__dirname, '/node_modules/bootstrap-4-grid/css/grid.min.css'),
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    inline: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: 8080,
  },
  target: `web`,
  mode: `production`,
  node: {
    ___filename: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              modules: {
                namedExport: true,
              },
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        use: [ '@svgr/webpack', 'url-loader' ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:6].css",
    }),
    new HtmlWebPackPlugin({
      title: 'Frontend',
      chunks: [ 'app' ],
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      title: 'Admin',
      chunks: [ 'admin' ],
      template: "./admin/index.html",
      filename: "./admin.html"
    }),
    new WebpackPwaManifest({
      name: process.env.REACT_APP_PWA_NAME,
      short_name: process.env.REACT_APP_PWA_SHORT_NAME,
      start_url: process.env.REACT_APP_PWA_START_URL,
      orientation: 'portrait',
      display: 'standalone',
      description: process.env.REACT_APP_PWA_DESCRIPTION,
      background_color: process.env.REACT_APP_PWA_COLOR,
      crossorigin: 'use-credentials',
      fingerprints: false,
      ios: {
        'apple-mobile-web-app-title': process.env.REACT_APP_PWA_SHORT_NAME,
        'apple-mobile-web-app-status-bar-style': process.env.REACT_APP_PWA_BAR_STYLE
      },
      icons: [
        {
          src: path.resolve('src/img/favicon.png'),
          sizes: [ 96, 128, 192, 256, 384, 512 ],
          purpose: 'any'
        },
        {
          src: path.resolve('src/img/favicon.png'),
          size: '1024x1024',
          purpose: 'any'
        }
      ]
    })
  ],
  output: {
    filename: '[name].[contenthash:6].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
};
