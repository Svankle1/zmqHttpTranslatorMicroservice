const zmq = require("zeromq");
const fetch = require('node-fetch');


async function run() {
  const sock = new zmq.Reply();

  await sock.bind("tcp://127.0.0.1:3001")

  for await (const [msg] of sock) {
    //console.log(msg.toString());
    const order = JSON.parse(msg.toString());
    console.log(order);


    await sock.send('Responding to: ' + msg.toString());
  }
}

run()