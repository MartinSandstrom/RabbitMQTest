var amqp = require('amqp');
var sys = require("sys");

var stdin = process.openStdin();
var connection = amqp.createConnection({host: 'localhost'});
var queueToSendTo = "testMessageQueue";

connection.on('ready', function() {

		var messageToSend = "Hello, MessageQueue!";

		connection.publish(queueToSendTo,messageToSend);

		console.log("Sent message: "+ messageToSend);
	}
);


stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then substring()
    connection.publish(queueToSendTo,d);
  });
