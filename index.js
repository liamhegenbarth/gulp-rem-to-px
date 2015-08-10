var through 	= require('through2'),
	gutil		= require('gulp-util'),
	PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-rem-to-px';

var transform = function(file, opts) {

	opts 	= opts || {};

	var fontSize = (opts.fontSize == null) ? 16 : opts.fontSize;

	var css		= file.toString('utf8'),

		regex 	= /\-?([0-9])*\.?([0-9])+([r][e][m])/g,
		single 	= /\-?([0-9])*\.?([0-9])+([r][e][m])/,

		temp 	= '',
		match 	= css.match(regex);

	if (match) {

		for (i=0; i < match.length; i++) {

			temp = temp || css,

			split = match[i].split('rem'),

			px = parseInt(split[0] * fontSize) + 'px',

			value = match[i].replace(match[i], px);

			temp = temp.replace(single, value);

		}

	}

	temp = new Buffer(temp);

	return temp;

}


var remToPx = function(opts) {

	var stream = through.obj(function(file, enc, cb) {
		
		if (file.isStream()) {

			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
			return cb();

		}

		if (file.isBuffer()) {
			
			file.contents = transform(file.contents, opts);

		}

		this.push(file);

		cb();

	});

	return stream;

}

module.exports = remToPx;
