var net = require('net');
var tcp = require('./tcp')
var async = require('async')
var socketIoPlc = require('./socketIoPlc')

module.exports = function (http){
	var io = require('socket.io')(http)
	var net = require('net');

	var data_tcp_1 = new tcp(2000)
	var data_tcp_2 = new tcp(1337)
	var data_tcp_3 = new tcp(1336)

	var socketIoPlc_1 = new socketIoPlc(8080)

	var dataTCP = {data_tcp_1, data_tcp_2, data_tcp_3}
//	console.log(dataTCP)

	async.waterfall([
		socketWeb,
		socketTCP
	], endSocket)

	function socketWeb(callback){
		io.on('connection', function(socket){
			console.log('User is connect: ' + socket.id);
			callback(null,socket)
		})
	}

	function socketTCP(socket, callback){

		socket.on('serialCom', function(){
			socketIoPlc_1.on('data', function(data){
				//console.log('data')
				io.emit('serialCom', data)
			})
			// for (var i in dataTCP) {
			// 	//console.log(dataTCP[i])
			// 	dataTCP[i].on('data', function(data){
			// 		io.emit('serialCom', data)
			// 		//console.log(data);
			// 	})
			// }
		})
		callback(null, null)
	}

	function endSocket(err, result){
		console.log(result)
	}
}
