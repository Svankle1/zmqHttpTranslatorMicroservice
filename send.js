const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Request()

  sock.connect("tcp://127.0.0.1:3001");
  console.log("Producer bound to port 3001");

  await sock.send(JSON.stringify({url:"https:api.open5e.com/v1/spells/?search=healing&limit=4", methood:".POST"}));
  const [result] = await sock.receive()

  console.log(result.toString())
}

run()