// Local Files

let bot = require('../bot');
let config = require('../config');
let msgctl = require('./message');
let ssnctl = require('./session');
let packageInfo = require('../package.json');

let Bot = bot.Bot;

let core = () => {
    bot.Bot.command(command.register('/start'), (ctx) => command.start(ctx));
    bot.Bot.command(command.register('/help'), (ctx) => ctx.reply("喵呜？想要找 Neko 嘛？试试看直接联系 @n3ko10 呢~"));
    bot.Bot.command(command.register('/send'), (ctx) => msgctl.control.core(ctx));
    bot.Bot.command(command.register('/meow'), (ctx) => command.meow(ctx));
    bot.Bot.command(command.register('/session'), (ctx) => msgctl.control.core(ctx))
    bot.Bot.command(command.register('/exit'), (ctx) => msgctl.control.core(ctx));
    bot.Bot.command(command.register('/getSessionId'), (ctx) => ssnctl.getSessionId(ctx));
    bot.Bot.command(command.register('/info'), (ctx => command.info(ctx)))
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
        var regex = new RegExp(bot.botUsername);
        bot.Log.debug()
        if (regex.test(text)) {
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
        bot.TelegramClient.sendMessage(config.ownerId, "来自: @" + ctx.message.from.username + " [ " + ctx.message.from.id + " ] 的 /start 命令")
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
    },
    info(ctx) {
        let Version = bot.botUsername + " 版本: " + packageInfo.version;
        let messageId = "Message ID: " + ctx.message.message_id;
        let messageType = "Message Type: " + ctx.message.chat.type;
        let senderId = "Sender ID: " + ctx.message.from.id;

        let chatTitle = "Chat Title: " + ctx.message.chat.title;
        let chatId = "Chat ID: " +  ctx.message.chat.id;

        let happyChat = "希望你开心喔！";
        let happyGroup = "希望你喜欢" + config.nickname + "喔！";

        ctx.reply(Version);
        
        bot.Log.debug(">>> INFO -" + ctx.message.date + "- Report");
        bot.Log.debug(messageId);
        bot.Log.debug(messageType);
        bot.Log.debug(senderId);

        if(ctx.message.chat.type == 'private') {
            ctx.reply(happyChat);
            bot.Log.debug(">>> INFO Report END <<<");
        }
        else {
            ctx.reply(happyGroup);

            bot.Log.debug(chatTitle);
            bot.Log.debug(chatId);
            bot.Log.debug(">>> INFO Report END <<<");
        }
    }
};

exports.core = core;
exports.command = command;