let bot = require('../bot');
let cmd = require('./command')

let send = (ctx, text) => { 
    let data = cmd.command.commandCheck(ctx)
    let array = data.split(' ');
    let sendId = array[0];
    array.shift()
    let sendText ='';
    for(let i of array) {
        sendText += i
    }
    bot.TelegramClient.sendMessage(sendId, sendText);
    bot.Log.trace("发送消息内容：" + sendText + "至 [ " + senderId + "] ");
}

module.exports = send;