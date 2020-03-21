const tmi = require('tmi.js');
const cfg = require('./config.json');
const msg = require('./msg.json');

let ready = true;
let fraseScelta = 0;
let intervalloDomande;

const attesa = (delayAttesa) => new Promise((resolve) => { setTimeout(resolve, delayAttesa*1000)});
const splitPhrase = s => s.includes('|') ? s.split('|') : [s];
const printPhrases = async (phrase) => {
    const phraseArray = splitPhrase(phrase);
    for (let i = 0; i < phraseArray.length; i++) {
        cfg.channels.forEach(channel => {
            client.say(`${channel}`, phraseArray[i]);
        });
        await attesa(2);
    }
};

const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true, secure: true },
    identity: cfg.bots[2],
    channels: cfg.channels
});

client.connect();

client.on('connected', (add, port) => {
    intervalloDomande = setInterval(async () => {
        if (!ready) return;
        ready = false;

        await printPhrases(msg.phrases[fraseScelta].question);

        await attesa(msg.phrases[fraseScelta].delay);

        await printPhrases(msg.phrases[fraseScelta].answer);

        ready = true;
        fraseScelta = fraseScelta < msg.phrases.length-1 ? fraseScelta+1 : 0;

    }, msg.cooldown*1000)
});
