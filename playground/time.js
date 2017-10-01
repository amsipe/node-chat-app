// Jan 1st 1970 00:00:00 am
var moment = require('moment');
// var date = moment();
// date.add(100,'year').subtract(9,'months');

// console.log(date.format('MMM Do, YYYY'))

// 10:35 am

var date = moment();

console.log(date.format('h:mm a'));

new Date().getTime();

var someTimestamp = moment().valueOf();

console.log(someTimestamp)