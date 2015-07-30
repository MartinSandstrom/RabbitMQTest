var amqp = require('amqp');
var sys = require("sys");

var stdin = process.openStdin();
var connection = amqp.createConnection({host: 'localhost'});

var queueToReceiveFrom = "myQueue";
var queueToSendTo = "mySecondQueue";

connection.on('ready', function() {
		connection.queue(queueToReceiveFrom,{autoDelete: false},function(queue) {

				queue.subscribe(function(messageReceived)	{
        	  console.log("Received message: "+ messageReceived.data.toString());
        });
    });
});


stdin.addListener("data", function(d) {
    connection.publish(queueToSendTo,d);
});
