T = {             // global THS700
  settings: {
    baudrate: 9600,
    parity: "none",
    databits: 8,      // databits for THS700 is value 8 only
    xonxoff: false,   // in reality 3 options: xon, xoff, xany
    rtscts: true,
    stopbits: 1,
    EOL: "LF" }, // LF, CR, LF_CR, CR_LF - maybe use unicode
  data: '',       // data holder
  EOL: '\u000A'         // EOL character LF=\u000A CR=\u000D
}; 
T.serialport = require("serialport"); // import serialport
T.settings.parser = T.serialport.parsers.raw; // default parser
T.getID = function() {
  // Check if T.connb exists
  T.data=''; // Data comes in chunks
  T.conn.write("ID?\r\n", function (err, results) {
    if (err) { alert(err) } }); 
}

T.connect = function(port) {
  // if (T.settings.EOL=="LF"){ T.EOL = '\u000A' }
  // else if (T.settings.EOL=="CR"){ T.EOL = '\u000D' }
  // else if (T.settings.EOL=="LF_CR"){ T.EOL = '\u000A\u000D' }
  // else if (T.settings.EOL=="CR_LF"){ T.EOL = '\u000D\u000A' }
  // else { console.log('Error: Missing EOL')} // Maybe alert
  T.conn = new T.serialport.SerialPort(port, T.settings, false);
  T.conn.open(function () {
    console.log('Serial port open at '+port);
    T.conn.on('error', function (err) { alert('Error: ' + err) });
    console.log('Before T.conn.on.close');
    T.conn.on('close', function(err) { console.log('Serialport closed!!!') });
    console.log('Before T.conn.on.data');
    T.conn.on('data', function (data){
      console.log('data: '+data); // characters
      // console.log(data); // raw
      T.data += data;  // Data comes in chunks
      if(T.data.indexOf(T.EOL) != -1){
        console.log('data: '+T.data); // characters
        $('#tekID').html(T.data); }
    });
    console.log('Before T.getID');
    T.getID();
  });
};


function connectionCntrll($scope) {
  $scope.main = {  };
  $scope.defaults = T.settings;
//  $scope.defaults = {baudrate: "9600", parity: "even", xonxof: false, ctsrts: true, stopbits: "1", EOL: "LF"};
  $scope.baudrates = [
    {label: "38400", value: "38400"},
    {label: "19200", value: "19200"},
    {label: "9600", value: "9600"},
    {label: "4800", value: "4800"},
    {label: "2400", value: "2400"},
    {label: "1200", value: "1200"},
    {label: "600", value: "600"},
    {label: "300", value: "300"}
  ];
  $scope.stopbits = [
    {label: "1", value: "1"},
    {label: "2", value: "2"}
  ];
  $scope.parities = [
    {label: "None", value: "none"},
    {label: "Even", value: "even"},
    {label: "Odd", value: "odd"}
  ];
  $scope.EOLS = [
    {label: "LF", value: "LF"},
    {label: "CR", value: "CR"},
    {label: "LF/CR", value: "LF_CR"},
    {label: "CR/LF", value: "CR_LF"}
  ];
  $scope.showValues = function () {alert(JSON.stringify(this.defaults))};
  $scope.getPorts = function (){
    $('#conn-port').empty();
    T.serialport.list(function (err, ports) {
      if (err) { alert(err); }
      else {
        ports.forEach(function (port) {
          $('#conn-port').append($('<option>', { value: port.comName }).text(port.comName));
  }) } }) };

  $scope.connect = function() {
    // Should send the port as a variable -- check if port is not null
    var port = $('#conn-port :selected').text();
    T.settings = this.defaults;
    if (T.conn){ T.conn.close( function(err){ // close port if is open
      if (err) { alert(err) }
      else {

        console.log(port);
        T.conn = null;
        delete T.conn;
        console.log('reopening');
        T.connect(port) } }) }
    else  { T.connect(port) }
  };

}