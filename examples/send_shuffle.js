//const zmq = require("zeromq");
import zmq from 'zeromq';

async function run() {
  const sock = new zmq.Request();

  sock.connect("tcp://127.0.0.1:3001");
  console.log("Producer bound to port 3001");
  const body = {"unique_nums": 6,};
  await sock.send(JSON.stringify({url:"http://localhost:8000/shuffle", method:"POST", body:body}));
  const [result] = await sock.receive();

  console.log(result.toString());
}

run();