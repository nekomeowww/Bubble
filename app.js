// Dependencies

const Koa = require('koa');
const koaBody = require('koa-body');

// Local Files

let bot = require('./bot');
let Bot = require('./bot').Bot;
let botctl = require('./bot').botctl;
let botlog = require('./bot').Log;
let config = require('./config');

let Time = new Date();
let CurrentTime = Time.getFullYear() + "-" + ("0"+(Time.getMonth()+1)).slice(-2) + "-" + ("0" + Time.getDate()).slice(-2) + "-" + ("0" + Time.getHours()).slice(-2) + "-" + ("0" + Time.getMinutes()).slice(-2) + "-" + ("0" + Time.getSeconds()).slice(-2);
let packageInfo = require('./package.json');
bot.Log.info("开始时间：" + CurrentTime + " - " + config.username + " 版本：" + packageInfo.version);

if(config.mode === "polling") {
    bot.Log.debug("已选择 Polling")
    bot.botctl.start();
    bot.Bot.startPolling();
}

else if(config.mode === "webhook") {
    // Webhook

    bot.Log.debug("已选择 Webhook")
    bot.Log.info("当前 Webhook 设定：" + config.webhook.url + config.webhook.path + " 在端口 " + config.webhook.port);

    let webhookUrl = config.webhook.url;
    let webhookPath = config.webhook.path;
    let webhookPort = config.webhook.port;

    const app = new Koa();

    bot.botctl.start();

    bot.Bot.telegram.setWebhook(webhookUrl + webhookPath);

    app.use(koaBody());
    app.use((ctx, next) => ctx.method === 'POST' || ctx.url === webhookPath
        ? bot.Bot.handleUpdate(ctx.request.body, ctx.response)
        : next()
    )

    app.listen(config.webhook.truePort);
}

else {
    console.log("Config file invalid");
}

botlog.info("可以使用了哦w");