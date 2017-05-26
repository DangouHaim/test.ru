const gulp = require("gulp");


function requireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

gulp.task("default", function () {

});

requireTask("styles", "./tasks/styles", {
    src: "dev/sass/*.sass"
});

requireTask("clear", "./tasks/clear", {
    src: "app"
});

requireTask("assets", "./tasks/assets", {
    src: "dev/assets/**"
});

gulp.task(
    "build",
    gulp.series("clear", gulp.parallel("styles", "assets"))
);

gulp.task("watch", function() {
    gulp.watch("dev/sass/**", gulp.series("styles"))
        .on("unlink", function (fpath) {
            rem.forget("styles", path.resolve(fpath));
        });

    gulp.watch("dev/assets/**", gulp.series("assets"));
});

requireTask("server", "./tasks/server", {
    server: "app",
    directory: true,
    watch: "app/**/*.*"
});

gulp.task("dev",
    gulp.series("build",
        gulp.parallel("watch", "server")));