// Dependencies

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const log4js = require('log4js');

// Local Files

let config = require('./config');
let core = require('./core').core;
let packageInfo = require('../package.json');

// Bot Username

let botUsername = new String("@" + config.username);

// Time

let Time = new Date();
let CurrentTime = new String(Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2) + "-" + ("0" + Time.getHours()).slice(-2) + "-" + ("0" + Time.getMinutes()).slice(-2) + "-" + ("0" + Time.getSeconds()).slice(-2));

// Logger

let fileName = "./log/" + config.username + "-" + CurrentTime + ".log";

log4js.configure({
    appenders: {
        Logger: { type: 'file', filename: fileName },
        console: { type: 'console' }
    },
    categories: {
        Bubble: { appenders: ['console', 'Logger'], level: 'trace' },
        default: { appenders: ['console', 'Logger'], level: 'trace' }
    }
});

const logger = log4js.getLogger('Bubble');
logger.info("开始时间：" + CurrentTime + " - " + botUsername + " 版本：" + packageInfo.version);
//logger.info("当前 Webhook 设定：" + config.webhook.url + config.webhook.path + " 在端口 " + config.webhook.port);

let Log = {
    info: (text) => {
        logger.info(text);
    },

    trace: (text) => {
        logger.trace(text);
    },

    debug: (text) => {
        logger.debug(text);
    },

    warning: (text) => {
        logger.warn(text);
    },

    fatal: (text) => {
        logger.fatal(text);
    }
}

// Bot

let token = config.token;

let Bot = new Telegraf(token);
let TelegramClient = new Telegram(token);

// Bot Control

let botctl = {
    start: () => {
        core.control();
        Bot.catch((err) => {
            Log.fatal(err)
          });
    },

    message: () => {

    }
}

exports.Bot = Bot;
exports.Log = Log;
exports.botctl = botctl;
exports.botUsername = botUsername;
exports.TelegramClient = TelegramClient;