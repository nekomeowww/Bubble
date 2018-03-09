// Local Files

let bot = require('../bot');
let config = require('../config');
let cmdctl = require('./command')
let ssnctl = require('./session');

let sessionId;

let control = {
    core(ctx) {
        ssnctl.core(ctx);
    }
}

let forward = (ctx) => {
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

exports.forward = forward;
exports.control = control;