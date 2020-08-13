/* config-overrides.js */

const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require("customize-cra");

const path = require("path");



module.exports = override(
    addWebpackAlias({
        ['@config'] : path.resolve(__dirname, './src/config'),
        ['@components'] : path.resolve(__dirname, './src/components'),
        ['@utils'] : path.resolve(__dirname, './src/utils'),
        ['@assets'] : path.resolve(__dirname, './src/assets'),
        ['@actions'] : path.resolve(__dirname, './src/actions'),
        ['@services'] : path.resolve(__dirname, './src/services'),
        ['@locales'] : path.resolve(__dirname, './src/locales'),
        ['@reducers'] : path.resolve(__dirname, './src/reducers'),
        ['@style'] : path.resolve(__dirname, './src/style'),
        ['@store'] : path.resolve(__dirname, './src/store'),
        ['@route'] : path.resolve(__dirname, './src/route'),


    })
);