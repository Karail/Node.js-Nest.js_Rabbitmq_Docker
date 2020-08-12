const amqp = require('amqplib');

async function start() {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE)

  const channel = await connection.createChannel();
 
  const queue = 'hello';
  const msg = 'Hello World!';

  channel.assertQueue(queue, {
    durable: false
  });
  const res = channel.sendToQueue(queue, Buffer.from(msg));

  console.log(res, " [x] Sent %s", msg);
} 
setTimeout(() => {
  start()   
}, 1000) 