var amqp = require('amqp');
var sys = require("sys");

var stdin = process.openStdin();
var connection = amqp.createConnection({host: 'localhost'});
var queueToSendTo = "myQueue";

connection.on('ready', function() {

		var messageToSend = "Hello, MessageQueue!";

		connection.publish(queueToSendTo,messageToSend);

		console.log("Sent message: "+ messageToSend);
});


stdin.addListener("data", function(d) {
    connection.publish(queueToSendTo,d);
});
