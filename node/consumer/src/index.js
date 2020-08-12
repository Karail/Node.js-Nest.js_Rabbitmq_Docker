const amqp = require('amqplib');

async function start() {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE)

  const channel = await connection.createChannel();

  const queue = 'hello';

  channel.assertQueue(queue, {
    durable: false
  });
 
  console.log('Waiting tasks...');

  channel.consume(queue, async (message) => {

    const content = message.content.toString();
   
    channel.ack(message);

    console.log(content,' received!');
  });
}
start()  