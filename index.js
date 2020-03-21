const tmi = require('tmi.js');
const cfg = require('./config.json');
const msg = require('./msg.json');

let ready = true;
let fraseScelta = 0;
let intervalloDomande;

const attesa = (delayAttesa) => new Promise((resolve) => { setTimeout(resolve, delayAttesa*1000)});
const splitFrase = s => s.includes('|') ? s.split('|') : [s];

const client = new tmi.Client({
    options: { debug: true },
    connection: { reconnect: true, secure: true },
    identity: cfg.bots[1],
    channels: cfg.channels
});

client.connect();

client.on('connected', (add, port) => {
    intervalloDomande = setInterval(async () => {
        if (!ready) return;
        ready = false;

        let frasi = splitFrase(msg.phrases[fraseScelta].question);
        for (let i = 0; i < frasi.length; i++) {
            client.say(`${cfg.channels[0]}`, frasi[i]);
            await attesa(2);
        };

        await attesa(msg.phrases[fraseScelta].delay);

        let riposte = splitFrase(msg.phrases[fraseScelta].answer);
        for (let i = 0; i < riposte.length; i++) {
            client.say(`${cfg.channels[0]}`, riposte[i]);
            await attesa(2);
        };

        ready = true;
        fraseScelta = fraseScelta <= msg.phrases.length-1 ? fraseScelta++ : 0;

    }, msg.cooldown*1000)
});
