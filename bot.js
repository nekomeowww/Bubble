// Dependencies

const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const log4js = require('log4js');
const HttpsProxyAgent = require('https-proxy-agent')
const HttpProxyAgent = require('http-proxy-agent')


// Local Files

let config = require('./config');
let core = require('./core').core;
let packageInfo = require('./package.json');

// Bot Username

let botUsername = new String("@" + config.username);

// Time

let Time = new Date();
let CurrentTime = new String(Time.getFullYear() + "-" + ("0" + (Time.getMonth() + 1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2) + "-" + ("0" + Time.getHours()).slice(-2) + "-" + ("0" + Time.getMinutes()).slice(-2) + "-" + ("0" + Time.getSeconds()).slice(-2));

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
};
// Bot
let token = config.token;
let proxy = config.proxy.url;

let Bot;
let TelegramClient;

if(config.proxy.enable) {
    Log.debug("启用了代理，代理地址为: " + config.proxy.url)
    
    Bot = new Telegraf(token, {
        telegram: {
          agent: new HttpsProxyAgent(proxy)
        }
    })
    
    TelegramClient = new Telegram(token, {
        telegram: {
          agent: new HttpsProxyAgent(proxy)
        }
    })
}
else {
    Log.debug("未选择开启代理使用，在防火墙地区可能会没有响应哦。")
    Bot = new Telegraf(token)
    TelegramClient = new Telegram(token)
}
  // Bot Control

  let botctl = {
    start: () => {
        core.control();
        Bot.catch((err) => {
            Log.fatal(err);
        });
    },
    message: () => {
    }
};
exports.Bot = Bot;
exports.Log = Log;
exports.botctl = botctl;
exports.botUsername = botUsername;
exports.TelegramClient = TelegramClient;