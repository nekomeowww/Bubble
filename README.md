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
    token : "Input your Telegram Bot API Key here",
    nickname : "Give your bot a nickname",
    username : "Input your Bot's username (without @)",
    ownerId: This is your chat id, id you dont known where to see it, find out in console log,
    webhook : {
        url: "You dont need to worry about this",
        path: "/",
        port: 8080
    }
}
```
### Run the bot

```
node app.js # Make sure you config your proxy if you are in the internet restricted countries.
```