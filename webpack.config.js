const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Dotenv = require('dotenv-webpack');
const debug = process.env.NODE_ENV !== 'production';

module.exports = (env, argv) => {
  const config = {
    entry: {
      index: [ 'babel-polyfill', './src/index.js' ],
      admin: [ 'babel-polyfill', './admin/index.js' ],
    },
    resolve: {
      extensions: ['.js', '.css', '.scss'],
      alias: {
        normalize: path.join(__dirname, '/node_modules/normalize.css'),
        grid: path.join(__dirname, '/node_modules/bootstrap-4-grid/css/grid.min.css'),
        modernizr$: path.resolve(__dirname, ".modernizrrc.js")
      }
    },
    devtool: debug ? 'eval-source-map' : false,
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      host: '0.0.0.0',
      historyApiFallback: true,
      port: 8080,
      liveReload: false,
      hot: true,
    },
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       defaultVendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.modernizrrc\.js$/,
          loader: "webpack-modernizr-loader",
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
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
          test: /\.(jpe?g|png|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.svg/,
          type: 'asset/inline',
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          },
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
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        }
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
        chunks: [ 'index' ],
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new HtmlWebPackPlugin({
        title: 'Admin',
        chunks: ['admin'],
        template: "./admin/index.html",
        filename: "./admin.html"
      }),
      new WebpackPwaManifest({
        name: env.REACT_APP_PWA_NAME,
        short_name: env.REACT_APP_PWA_SHORT_NAME,
        start_url: env.REACT_APP_PWA_START_URL,
        orientation: 'portrait',
        display: 'standalone',
        description: env.REACT_APP_PWA_DESCRIPTION,
        background_color: env.REACT_APP_PWA_COLOR,
        theme_color: env.REACT_APP_PWA_THEME_COLOR,
        crossorigin: 'use-credentials',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/img/favicon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
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
      filename: '[name].[fullhash:6].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      }
    },
  };

  return config;
}
