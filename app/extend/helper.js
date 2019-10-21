'use strict';

const sd = require('silly-datetime');

exports.relativeTime = time => sd.format(new Date(time), 'YYYY-MM-DD HH:mm');

