
var amqp = require('amqp');

var connection = amqp.createConnection({host: 'localhost'});

var queueToReceiveFrom = "myQueue";

connection.on('ready',function() {
		connection.queue(queueToReceiveFrom,{autoDelete: false},function(queue) {

  				console.log('Waiting messages...');

  				queue.subscribe(function(messageReceived)	{
              	console.log("Received message: "+ messageReceived.data.toString());
          });
    });
});
