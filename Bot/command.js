let bot = require('../bot');
let config = require('../config');
let send = require('./message')

let Bot = bot.Bot;

let core = () => {
    bot.Bot.command(command.register('/start'), (ctx) => command.start(ctx));
    bot.Bot.command(command.register('/help'), (ctx) => ctx.reply("喵呜？想要找 Neko 嘛？试试看直接联系 @n3ko10 呢~"));
    bot.Bot.command(command.register('/subscribe'), (ctx) => subscribe.core.getInfo());
    bot.Bot.command(command.register('/send'), (ctx) => send(ctx, ctx));
    bot.Bot.command(command.register('/meow'), (ctx) => command.meow(ctx)) 
}

let command = {
    // Register the command and also checkin command with bot's ssername
    register(commandName) {
        commands = [commandName, commandName + bot.botUsername];
        return commands;
    },
    // Return the pure data without the "/command" part of string
    commandCheck(ctx) {
        let result = "";
        let text = new String(ctx.message.text);
        let split = text.indexOf(' ');
        if (/@NingmengBot/gi.test(text)) {
            result = text.slice(split + 1);
            return result;
        }
        else {
            result = text.slice(split + 1);
            return result;
        }
    },
    start(ctx) {
        ctx.reply("其实咱不是 Bot 喔，因为 Neko 现在不在线，已经将消息转发到 Neko 那边去了呢w \n稍等一下下啦，说不定 Neko 等会儿就会回复了呢");
    },
    meow(ctx) {
        if(ctx.message.from.id == config.ownerId && (ctx.message.chat.type == "group" || ctx.message.chat.type == "supergroup")) {
            let chatType = ctx.message.chat.type;
            let chatId = ctx.message.chat.id;
            let chatName = ctx.message.chat.title;
            let date = ctx.message.date;
            let text = ctx.message.text;
        
            let info = "群组名字: " + chatName + "\n" + "群组类型: " + chatType + "\n" + "群组 ID: " + chatId
            bot.TelegramClient.sendMessage(config.ownerId, info)
        }
        else {
            ctx.reply("无权使用。")
        }
    }
};

exports.core = core;
exports.command = command;