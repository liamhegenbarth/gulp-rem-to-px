# gulp-rem-to-px
Gulp plugin to convert rem units to pixels.


## Options
Accepts a base font size option to use for rem-to-px calculation. Default is `16px`.


## Example 
```
var remToPx = require('gulp-rem-to-px'),
    rename 	= require('gulp-rename');

gulp.task('legacy-ie', function()
{
	gulp.src('./style.css'),   
		.pipe(remToPx())
		.pipe(rename('legacy-ie.css'))
		.pipe(gulp.dest(./));
});

gulp.task('legacy-ie-12px', function(){
	gulp.src('./style.css'),   
		.pipe(remToPx({
    		fontSize : 12
    	}))
		.pipe(rename('legacy-ie-12px.css'))
		.pipe(gulp.dest(./));
});

gulp.task('default', ['legacy-ie', 'legacy-ie-12px']);
```

Thanks to all contributers :)
