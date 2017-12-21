// Local Files

let Bot = require('./bot').Bot;
let botctl = require('./bot').botctl;
let botlog = require('./bot').Log;
let config = require('./config');

botctl.start();
botlog.info("可以使用了哦w");
Bot.startPolling();