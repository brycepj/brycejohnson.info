const twilio = require("twilio");

const { getOtsUrl } = require("./api");

sendToSms();

function sendToSms() {
  const accountSid = "AC006ad8e18b0da83e43c40f56e86cc333";
  const authToken = "c4b714d54ea70a6da7f914cf3622427a";

  const client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: "Hello from Node",
      to: "+14802027371", // Text this number
      from: "+14804185258" // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

function sendToEmail() {}
