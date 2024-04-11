const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path=require('path');
const webpack = require("webpack");
const dotenv = require("dotenv");
const NodePolyfillPlugin=require("node-polyfill-webpack-plugin")
dotenv.config();

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],

  //This property defines the file path and the file name which will be used for deploying the bundled file
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js",
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", "postcss-loader",
            ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|webp)|jpg$/i, 
          loader: 'file-loader',
        }
      ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
            chunkFilename: "index.css"
          }),
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        }),
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new NodePolyfillPlugin(),
    ],
    devServer: {
      static: path.resolve(__dirname, "./dist"),
      hot: true,
      historyApiFallback: true,
    },
  };