process.stdout.write("Starting server...");

var cn = require('./connection.js');
var client = new cn('ws://192.168.1.4:11111');

var bridge = require('./bridge.js');
var arduino = new bridge();

// Arduino connection code
arduino.on('data', function(data) {
	console.log('Received: ' + data);
	client.send('log', data);
});

// OsO connection code
client.on('open', function() {
	console.log('Connected to Ohm sweet Ohm');
	// Send MAC address for identification
	getMac(function(mac) {
		client.send('hello', mac);
	});
});

client.on('message', function(data) {
	console.log(data);
	data = JSON.parse(data);
	if (data.id == 'who') {
		var manifest;
		require('fs').readFile('manifest.json', function(err, mani) {
			console.log(mani.toString());
			manifest = JSON.parse(mani.toString());

			getMac(function(mac) {
				manifest["mac"] = mac;
				client.send('who', JSON.stringify(manifest));
			});
		});
	}
	console.log('Received: ' + data);
});

function getMac(back) {
	require('getmac').getMac(function(err, mac) {
		if (err) throw err;
		back(mac);
	});
}

console.log('started.');