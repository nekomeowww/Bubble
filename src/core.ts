let bot = require('./bot');
let config = require('./config');
let packageInfo = require('../package.json');
let subscribe = require('./User/subscribe');

let core = {

    // Main control of all things that requires ctx

    control: () => {

        let Bot = bot.Bot;

        // Command

        Bot.command(command.register('/start'), (ctx) => ctx.reply("其实咱不是 Bot 喔，因为 Neko 现在不在线，已经将消息转发到 Neko 那边去了呢w \n稍等一下下啦，说不定 Neko 等会儿就会回复了呢"));
        Bot.command(command.register('/help'), (ctx) => ctx.reply("喵呜？想要找 Neko 嘛？试试看直接联系 @n3ko10 呢~"));
        Bot.command(command.register('/subscribe'), (ctx) => subscribe.core.getInfo());

        // Context Processing
        
        // Text Handling

        let botlog = bot.Log;

        Bot.on('text', (ctx) => {

            if(ctx.message.from.first_name && ctx.message.from.last_name) {
                botlog.trace("来自: " + ctx.message.from.first_name + " " + ctx.message.from.last_name + " - " + ctx.message.text);
            }
            else if(ctx.message.from.username) {
                botlog.trace("来自: " + ctx.message.from.username + " - " + ctx.message.text)                
            }
            else {
                botlog.trace("来自: " + ctx.message.from.id + " - " + ctx.message.text)
            }

            return ctx.message.text;
        })

        // Sticker Handling

        Bot.on('sticker', (ctx) => {

        });

        // Photo Handling

        Bot.on('photo', (ctx) => {
            //bot.Log.debug(ctx.message);
        });

        // Other
    }
}

let command = {

    // Register the command and also checkin command with bot's ssername

    register: (commandName) => {
        commands = [commandName, commandName + bot.botUsername];
        return commands;
    },

    // Return the pure data without the "/command" part of string

    commandCheck: (ctx) => {
        let result = new String("");
        let text = new String(ctx.message.text);
        let split = text.indexOf(' ');

        if(/@NingmengBot/gi.test(text)) {
            result = text.slice(split + 1);
            return result;
        }
        else {
            result = text.slice(split + 1);
            return result;
        }
    }
}

exports.core = core;
exports.command = command;