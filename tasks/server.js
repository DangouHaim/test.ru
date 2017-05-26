const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const bsync = require("browser-sync");

module.exports = function (options) {
    return function () {
        bsync.init({
            server: options.server,
            directory: options.directory
        });
        bsync.watch(options.watch).on("change", bsync.reload);
    }
}