const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const combine = require("stream-combiner2").obj;


const isDebug = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

module.exports = function (options) {
    return function () {
        return combine(
            gulp.src(options.src),
            $.cached("styles"),
            $.remember("styles"),
            $.if(isDebug, $.sourcemaps.init()),
            $.sass(),
            $.concat("main.css"),
            $.if(isDebug, $.sourcemaps.write(), $.cssnano()),
            gulp.dest("app/css/")
        ).on("error", $.notify.onError(function (err) {
            return {
                title: "Styles",
                message: err.message
            };
        }));
    }
}