function connectionCntrll($scope) {
  $scope.main = {  };
  $scope.defaults = {baudrate: "9600", parity: "even", xonxof: false, ctsrts: true, stopbits: "1", EOL: "LF"};
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

}