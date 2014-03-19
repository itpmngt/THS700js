console.log('THS700 Console');
// var SerialPort = require("serialport").SerialPort;

var com = require("serialport");

T = {}; // global
T.conn = { port: "COM4", baudrate: 9600, databits: 8, stopbits: 1, parity: 'none', parser: com.parsers.raw };
T.msg = 'Error text';
T.ports = [];

$(function () {
  $("#dialog-msg").dialog({
    // resizable: false,
    // height:140,
    // modal: true,
    // buttons: { Cancel: function() { $( this ).dialog( "close" ) } }
    autoOpen: false,
    show: { effect: "blind", duration: 500 },
    hide: { effect: "explode", duration: 500 }
  });
  $("#dialog").click(function () {
    $("#dialog-msg").text(T.msg).dialog("open")
  })
});

// global.setTimeout( function(){
//   T.msg = 'setTimeout msg';
//   $( "#dialog" ).click();
//   console.log('Error: ' + T.msg); } , 1000);

$(function () {
  $('#conn-refresh').click(function () {
    com.list(function (err, ports) {
      if (err) {
        T.msg = err;
        $("#dialog").click();
        console.log('Error: ' + T.msg);
      }
      else {
        T.ports = ports;
        ports.forEach(function (port) {
          console.log('Ports available:');
          console.log(' ' + port.comName + ' - ' + port.pnpId + ' - ' + port.manufacturer);
          $('#conn-port').append($('<option>', { value: port.comName }).text(port.comName))
        })
      }
    })
  });

  $('#conn-refresh').click();

  $('#conn-connect').click(function () {
    var port = new com.SerialPort(T.conn.port, T.conn, false);
    port.open(function () {
      T.msg = 'Connected';
      $("#dialog").click();
      console.log('Error: ' + T.msg);

      port.on('error', function (err) {
        T.msg = err;
        $("#dialog").click();
        console.log('Error: ' + err);
      });
      port.on('data', function (data) { console.log('data: ' + data) });

      port.write("ID?\r\n", function (err, results) {
        if (err) {
          T.msg = err;
          $("#dialog").click();
          console.log('Error: ' + err);
        }
        else { console.log('results ' + results) }
      })
    })
  });
});

