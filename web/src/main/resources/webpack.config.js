// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var jquery = require('jquery');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

var srcDir = path.resolve(process.cwd(), 'src/static');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    devtool: "#source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/static/js/"),
        publicPath: "dist/static/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui",
            jquery: srcDir + "/js/lib/jquery.min.js",
            vue: srcDir + "/js/lib/vue/vue.min.js",
            vueResource: srcDir + "/js/lib/vue/vue-resource.min.js",
            bootstrap: srcDir + "/js/lib/bootstrap.min.js",
            scroll: srcDir + "/js/lib/scroll.min.js",
            calendar: srcDir + "/js/lib/calendar.min.js",
            feeds: srcDir + "/js/lib/feeds.min.js"
        }
    },
    plugins: [
        // new CommonsChunkPlugin('common.js'),
        new CleanWebpackPlugin(['dist']),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
            jQuery:"jquery"
        })
    ]
};