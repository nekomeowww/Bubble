let bot = require('../bot');
let cmd = require('./command')

let send = (ctx, text) => { 
    let data = cmd.command.commandCheck(ctx)
    let array = data.split(' ');
    let sendId = array[0];
    array.shift()
    let sendText ='';
    bot.Log.debug(array)
    for(let i of array) {
        bot.Log.debug(i);
        sendText += i
    }
    bot.TelegramClient.sendMessage(sendId, sendText)
    bot.Log.trace("消息已经发送出去了哦！")
    bot.Log.trace("消息内容：" + sendText);
}

module.exports = send;