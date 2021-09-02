const { App } = require('@slack/bolt');

// Credenciais do bot aqui, mandar para uma environment variable depois!
var SLACK_BOT_TOKEN = 'xoxb-2432921436997-2463452595713-aihf7E7vrvfWbkzj6Lly5oeW';
var SLACK_SIGNING_SECRET = '31893ad330afd82bbd55f67d6dd5339d';
var SLACK_APP_TOKEN = 'xapp-1-A02D1TY6NG6-2474653659248-1108eea7f0542da5411538c1dbc58c9879e1f3532e353aae9056b257976470ef';

// Initializes your app with your bot token and signing secret
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true, 
  appToken: SLACK_APP_TOKEN
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Hey there <@${message.user}>!`
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Click Me"
              },
              "action_id": "button_click"
            }
          }
        ],
        text: `Hey there <@${message.user}>!`
    });
});
    
app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  // Port 3000 ou 5000?

  console.log('⚡️ Bolt app is running!');
})();