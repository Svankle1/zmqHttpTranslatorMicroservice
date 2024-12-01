//const zmq = require("zeromq");
//const fetch = require('node-fetch');
import zmq from 'zeromq';
import fetch from 'node-fetch';


async function run() {
  const sock = new zmq.Reply();

  await sock.bind("tcp://127.0.0.1:3001")

  for await (const [msg] of sock) {
    //console.log(msg.toString());
    const order = JSON.parse(msg.toString());
    console.log(order);

    const options = {
        method: order.method
        //body: JSON.stringify(body),
        //headers: {'Content-Type': 'application/json'}
    }
    if (order.body)
        options.body = JSON.stringify(order.body);

    let resp = (async() =>{
      try {
        //Make web request for data
        //console.log(url);
        let response = await fetch(order.url);
    
        //Convert response data to json
        let returnedData = await response.json();
        console.log(returnedData);

        //Now use json data  
        await sock.send(JSON.stringify(returnedData));
    
      } catch (error) {
        console.log(error +" err");

        await sock.send(JSON.stringify({ERR_CODE:error}));
      }})();
  }
}

run()

async function sendRequest(url, options) {
    const body = {"message": "This is a message from CS361"};
  
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }