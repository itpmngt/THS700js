T = {}; // global THS700
T.serialport = require("serialport");
// databits for THS700 is only value 8
T.settings = {baudrate: 9600, parity: "none", databits: 8, xonxoff: false, rtscts: true, stopbits: 1, EOL: "LF", parser: T.serialport.parsers.raw};
// T.conn = {};
T.data = '';
T.getID = function() {
  // Check if T.connb exists
  T.data=''; // Data comes in chunks
  T.conn.write("ID?\r\n", function (err, results) {
    if (err) { alert(err) } }); 
}


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
    T.serialport.list(function (err, ports) {
      if (err) { alert('Error: ' + err); }
      else {
        console.log('Ports available:');
        ports.forEach(function (port) {
          console.log(' ' + port.comName + ' - ' + port.pnpId + ' - ' + port.manufacturer);
          $('#conn-port').append($('<option>', { value: port.comName }).text(port.comName));
        }) } }) };

  $scope.connect = function() {
    if (T.conn){T.conn.close();}
    T.conn = new T.serialport.SerialPort($('#conn-port :selected').text(), this.defaults, false);
    T.conn.open(function () {
      // alert('Connected');
      T.conn.on('error', function (err) { alert('Error: ' + err) });
      T.conn.on('data', function (data){
        // console.log(data); // raw
        // alert('data: ' + data); // characters
        T.data = T.data + data;  // Data comes in chunks
        $('#tekID').html(T.data);
      });
      T.getID();
    });
  };
}