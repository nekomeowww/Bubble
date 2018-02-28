# Bubble Bot

## Description

This is a bot that you could use it as a account in Telegram.

## Usage

```
git clone https://github.com/nekomeowww/Bubble.git
```

### Configuration

Run this command:
```
cp config.js.example config.js
```

Edit config.js
```
var config = {
    token : "API Key",
    nickname : "Nickname",
    username : "Bot username",
    webhook : {
        url: "Webhook url",
        path: "/",
        port: 8500
    },
    proxy: {
        enable: true,
        url: "http://127.0.0.1:1087"
    }
}

module.exports = config;
```
### Run the bot

```
node app.js # Make sure you config your proxy if you are in the internet restricted countries.
```