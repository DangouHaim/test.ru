const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const del = require("del");

module.exports = function (options) {
    return function () {
        return del(options.src);
    }
}