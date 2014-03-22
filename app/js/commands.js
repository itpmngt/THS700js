T.commands = {
	{ "ID?" : {
		type: query,
		pretext : "ID",
		description: "Returns identifying information about the instrument and its
									firmware in Tektronix Codes and Formats notation.\n
									TEK/<model>,CF:91.1CT,FV:<firmware>" } },
	{ "*IDN?" : {
		type: query,
		pretext : "ID",
		description: "Returns the instrument identification code in IEEE 488.2 notation.\n
									TEKTRONIX,<model>,0,CF:91.1CT FV:<firmware>" } },
	{ "RS232?" : {
		type: query,
		pretext : "RS232",
		description: "" } },
	{ "RS232:BAUd" : {
		type: set,
		pretext : "Baud Rate",
		values: [300, 600, 1200, 2400, 4800, 9600, 19200, 38400],
		description: "Sets the RS-232 interface transmission speed." } },
	{ "RS232:BAUd?" : {
		type: query,
		pretext : "Baud Rate",
		description: "Queries the RS-232 interface transmission speed." } },
	{ "RS232:CONTROl:RTS" : {
		type: set,
		pretext : "RTS/CTS ",
		values: ["ON", "RFR", "IBFull"],
		description: "Sets the state of RS232 hard flagging RTS/CTS." } },
	{ "RS232:CONTROl:RTS?" : {
		type: query,
		pretext : "RTS/CTS",
		description: "Queries the state of RS232 hard flagging RTS/CTS." } },
	{ "RS232:HARDFlagging" : {
		type: set,
		pretext : "RTS/CTS ",
		values: ["ON", "OFF"],
		description: "Sets the state of RS232 hard flagging RTS/CTS." } },
	{ "RS232:HARDFlagging?" : {
		type: query,
		pretext : "RTS/CTS ",
		description: "Queries the state of RS232 hard flagging RTS/CTS." } },
}