// Local Files

let bot = require('./bot');
let config = require('./config');
let cmdctl = require('./Bot/command');
let packageInfo = require('./package.json');
let subscribe = require('./User/subscribe');

// Dependencies

let fileSystem = require('fs');
var jsonFile = require('jsonfile')

let core = {
    
    // Main control of all things that requires ctx
    
    control: () => {
        let Bot = bot.Bot;
        
        // Command

        cmdctl.core();

        // Context Processing

        // Text Handling
        
        let output = "来自: "
        Bot.on('text', (ctx) => {
            if(ctx.message.chat.type == "group" || ctx.message.chat.type == "supergroup") {
                var userList = groupDisplay(ctx);
                //exportsDb(ctx, userList);
            }
            else {
                var userList = privateDisplay(ctx);
                //exportsDb(ctx, userList);
            }
        });
        
        // Sticker Handling
        
        Bot.on('sticker', (ctx) => {
        });
        
        // Photo Handling
        
        Bot.on('photo', (ctx) => {
            //bot.Log.debug(ctx.message);
        });

        // Other

        let exportsDb = (ctx, list) => {
            let file = "./group.json"
            if(!fileSystem.existsSync(file)) {
                fileSystem.openSync(file, "wx", (err, fd) => {
                    bot.Log.fatal(err)
                    fileSystem.closeSync(fd, (err) => {
                        bot.Log.fatal(err);
                    });
                });
            }
            //bot.Log.debug("已更新群组列表...");
        }

        let groupDisplay = (ctx) => {
            
            let lastName = ctx.message.from.last_name;
            let firstName = ctx.message.from.first_name;
            let username = ctx.message.from.username;
            let senderId = ctx.message.from.id;            

            let chatType = ctx.message.chat.type;
            let chatId = ctx.message.chat.id;
            let chatName = ctx.message.chat.title;
            let date = ctx.message.date;
            let text = ctx.message.text;

            if(firstName && lastName && (chatType == "group" || chatType == "supergroup")) {
                bot.Log.trace(output + firstName + " " + lastName + " [ ID:" + senderId + " 来自群组: " + chatName + " [ "+ chatType +" ]" + ": " + chatId +" ]")
                bot.Log.trace("消息: " + text);

                return {chatName, chatId}
            }
            else if(username && (chatType == "group" || chatType == "supergroup")) {
                bot.Log.trace(output + username + " [ ID:" + senderId + " 来自群组: " + chatName + " [ "+ chatType +" ]" + ": " + chatId +" ]")
                bot.Log.trace("消息: " + text);
                
                return {chatName, chatId}
            }
            else if((chatType == "group" || chatType == "supergroup")){
                bot.Log.trace(output + " [ ID:" + senderId + " 来自群组: " + chatName + " [ "+ chatType +" ]" + ": " + chatId +" ]")
                bot.Log.trace("消息: " + text);

                return {chatName, chatId}
            }
        }

        let privateDisplay = (ctx) => {
            
            let lastName = ctx.message.from.last_name;
            let firstName = ctx.message.from.first_name;
            let username = ctx.message.from.username;
            let senderId = ctx.message.from.id;            

            let chatType = ctx.message.chat.type;
            let chatId = ctx.message.chat.id;
            let date = ctx.message.date;
            let text = ctx.message.text;


            if(firstName && lastName) {
                bot.Log.trace(output + firstName + " " + lastName + " [ ID:" + senderId + " ]")
                bot.Log.trace("消息: " + text);

                forward(ctx);

                let fullname = firstName + " " + lastName    
                return {fullname, senderId}
            }
            else if(username) {
                bot.Log.trace(output + username + " [ ID:" + senderId + " ]")
                bot.Log.trace("消息: " + text);

                forward(ctx);
                
                return {username, senderId}
            }
            else {
                botlog.trace(output + " [ ID:" + senderId + " ]")
                botlog.trace("消息: " + text);

                forward(ctx);

                return {senderId, senderId}
            }
        }
    }
};

let forward = (ctx) => {
    if(ctx.message.from.id == config.ownerId) {
        ctx.reply("Ayaka 知道了呢。");
        return;
    }
    else {
        bot.TelegramClient.sendMessage(config.ownerId, "来自: @" + ctx.message.from.username + " [ " + ctx.message.from.id + " ] ");
        bot.TelegramClient.forwardMessage(config.ownerId, ctx.message.from.id, ctx.message.message_id);
        ctx.reply("消息转发成功到 Ayaka 主人那边了哟。");
    }
}


exports.core = core;
