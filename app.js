const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.event('message', async ({ event, client }) => {
  const result = await client.chat.postMessage({
    channel: event.channel,
    text: `Hello, <@${event.user}>! 🎉`
  });
});

app.event('message', async ({ event, client }) => {
  if(event.files) {
    var url = await event.files[0].url_private;
    console.log(url);
    const axios = require('axios');
    const res = await axios.get(url, {
      headers: {
        'Authorization': 'Bearer ' +SLACK_BOT_TOKEN
      },
      responseType: 'stream'
    });

    var http = require('http');
    var {Base64Encode} = require('base64-stream');
    var arquivoBase64 = res.data.pipe(new Base64Encode()).pipe(process.stdout);
    console.log(event.user);
    console.log(event.channel);


    const FormData = require('form-data');
    const axios2 = require('axios');
    const https = require('https');

    const formData = new FormData();
    
    formData.append('userId', "1234");
    formData.append('channelId', event.channel);
    formData.append('file', arquivoBase64);

    const res2 = await axios2.post('https://localhost:44314/handler1.ashx', formData, {
      // You need to use `getHeaders()` in Node.js because Axios doesn't
      // automatically set the multipart form boundary in Node.
      headers: formData.getHeaders(),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
      
    });
  }
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
