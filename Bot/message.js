let bot = require('../bot');
let cmd = require('./command')

let send = (ctx, text) => { 
    let data = cmd.command.commandCheck(ctx)
    let array = data.split(' ');
    let sendId = array[0];
    let sendText;
    for(var i = 1; i < array.length; i++) {
        sendText = array[1];
        bot.Log.debug(array[i])
        bot.Log.debug(i);
        sendText += array[i]
    }
    bot.TelegramClient.sendMessage(sendId, sendText)
    bot.Log.trace("消息已经发送出去了哦！")
    bot.Log.trace("消息内容：" + sendText);
}

module.exports = send;