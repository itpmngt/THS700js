// var SerialPort = require("serialport").SerialPort;
var com = require("serialport");

com.list(function (err, ports) {
  if (err){console.log('error: ' + err)}
  ports.forEach(function(port) {
    console.log(port.comName + ' - ' + port.pnpId + ' - ' +port.manufacturer);
		// console.log(port.serialNumber + ' - ' + port.vendorId + ' - ' +  port.productId);
  });
});


var port = new com.SerialPort("COM4", { 
	baudrate: 9600, databits: 8, stopbits: 1, parity: 'none',
	parser: com.parsers.raw }, false );

port.open(function () {
  console.log('Connection established.');
  port.on('error', function(err) { console.log('error: ' + err) });
  port.on('data', function(data) { console.log('data: ' + data) });

  port.write("ID?\r\n", function(err, results) {
    if(err){console.log('err ' + err)}
    else{ console.log('results ' + results) } });
});
