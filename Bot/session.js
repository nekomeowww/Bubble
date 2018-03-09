// Local Files

let bot = require('../bot');
let config = require('../config');
let cmdctl = require('../Bot/command');
let packageInfo = require('../package.json');
let subscribe = require('../User/subscribe');

// Dependencies

let fileSystem = require('fs');
var jsonFile = require('jsonfile')

// Variables

var sessionId = undefined;


let session = {
    core(ctx) {
        let data = ctx.message.text;
        if(data.startsWith("/session start") && ctx.message.from.id == config.ownerId) {
            this.start(ctx, (sendId) => {
                sessionId = sendId;
                bot.TelegramClient.sendMessage(config.ownerId, "开始了与 [ id: " + sendId + " ] 的会话。");
            })
        }
        else if(data.startsWith("/exit") && ctx.message.from.id == config.ownerId) {
            this.exit(ctx);
        }
        else if(data.startsWith('/send') && ctx.message.from.id == config.ownerId) {
            if(sessionId == undefined) {
                bot.TelegramClient.sendMessage(config.ownerId, "在使用 /send 前请先运行一次 /session start [target id]");
            }
            else {
                try {
                    let text = cmdctl.command.commandCheck(ctx);
                    bot.TelegramClient.sendMessage(sessionId, text);
                    bot.Log.debug("消息已经递送给 " + sessionId + " 了。");
                }
                catch(err) {
                    bot.Log.fatal(err)
                }
                
            }    
        }
        else {
            ctx.reply("无权使用。");
        }
    },
    getSessionId(ctx) {
        if(ctx.message.from.id == config.ownerId && sessionId != undefined) {
            bot.TelegramClient.sendMessage(config.ownerId, sessionId);
        }
        else {
            ctx.reply("无效的命令。");
        }
    },
    start(ctx, callback) {
        let data = cmdctl.command.commandCheck(ctx);
        let sessionId;
        let array = data.split(' ');

        if(array[1]) {
            sessionId = array[1];
            callback(sessionId);
        }
        else {
            bot.TelegramClient.sendMessage(config.ownerId, "出错啦！缺少命令：senderId")
        }
    },

    exit(ctx) {
        sessionId = undefined;
        bot.TelegramClient.sendMessage(config.ownerId, "已退出该会话。");
    },

    forward(ctx) {
        if(ctx.message.from.id == config.ownerId) {
            return;
        }
        else {
            if(ctx.message.from.username != undefined){
                bot.TelegramClient.sendMessage(config.ownerId, "来自: @" + ctx.message.from.username + " [ " + ctx.message.from.id + " ]")
            }
            else if(ctx.message.from.first_name != undefined && ctx.message.from.last_name != undefined) {
                bot.TelegramClient.sendMessage(config.ownerId, "来自: " + ctx.message.from.first_name + " " + ctx.message.from.last_name + " [ " + ctx.message.from.id + " ]")            
            }
            else if(ctx.message.from.first_name != undefined) {
                bot.TelegramClient.sendMessage(config.ownerId, "来自: " + ctx.message.from.first_name + " [ " + ctx.message.from.id + " ]")
            }
            else if(ctx.message.from.last_name != undefined) {
                bot.TelegramClient.sendMessage(config.ownerId, "来自: " + ctx.message.from.last_name + " [ " + ctx.message.from.id + " ]")
            }
            else {
                bot.TelegramClient.sendMessage(config.ownerId, "来自: [ " + ctx.message.from.id + " ] ");
            }
            bot.TelegramClient.forwardMessage(config.ownerId, ctx.message.from.id, ctx.message.message_id);
        }
    }
}

module.exports = session;