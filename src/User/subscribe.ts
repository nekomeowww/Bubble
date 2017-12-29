// Modules

let fs = require('fs');

// Local Files

let bot = require('../bot');
let subscribeInfo = __dirname + '/../Data/subscription.json';

let io = {
    readSubscribeInfo() {
        let botlog = bot.Log;
        let object = new Object();
        fs.readFile(subscribeInfo, 'utf8', (err, json) => {
            if (err) {
                return botlog.fatal(err);
            }
            object = JSON.parse(json);
            core.process(object);
        });
    },
    writeSubscribeInfo(data) {
        let botlog = bot.Log;
        fs.writeFile(subInfo, JSON.stringify(data), 'utf8', (err) => {
            if(err) {
                return botlog.fatal(err);
            }
            botlog.info("已更新订阅列表w");
        })
    }
}

let core = {
    getInfo() {
        io.readSubscribeInfo();
    },
    process(data) {
        bot.Log.debug(data);
    }
}

exports.io = io;
exports.core = core;
exports.subscriotionInfo = subscribeInfo;

