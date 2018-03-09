# Bubble Bot

### Description

This is a bot that you could use it as a account in Telegram.

### Demo

![](https://github.com/nekomeowww/Bubble/blob/dev/doc/FinalProduct.jpg)

#### Download

```bash
git clone https://github.com/nekomeowww/Bubble.git
```

or you can download the latest release package:

```bash
wget https://github.com/nekomeowww/Bubble/archive/1.1.5.tar.gz
```
and unzip it.

```bash
tar xvf 1.1.5.tar.gz
```

#### Installation

```
npm install # or yarn install
```

#### Configuration

Run this command:

```bash
cp config.js.example config.js
```

Edit config.js
```javascript
var config = {
    mode: "polling", // webhook or polling
    token : "API Key",
    nickname : "Nickname",
    username : "Bot username",
    ownerId: 330829346,
    webhook : {
        url: "Webhook url",
        path: "/",
        port: 8500
    },
    proxy: {
        enable: false,
        url: "http://127.0.0.1:1087"
    }
}

module.exports = config;
```
----

#### Start the bot


```bash
node app.js # Make sure you config your proxy if you are in the internet restricted countries.
```


### Usage

#### Private Chat

Use ``` /session start [target ID] ``` to start a session to someone.    
After your chat you can suspend it by running ``` /exit ``` command

#### Group Chat

Use ``` /meow ``` in a group to get the information about a group

#### Use info to get the full information of everywhere

Use ``` /info ``` in everywhere to get information on console