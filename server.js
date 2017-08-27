/*
* @Author: admin
* @Date:   2017-08-27 09:51:57
* @Last Modified by:   admin
* @Last Modified time: 2017-08-27 11:15:42
*/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890);

io.on('connection',function(socket){
	console.log('new Client');
	var redisClient=redis.createClient();
	redisClient.subscribe('message');
	redisClient.on('message',function(channel,message){
		console.log('new message',channel,message);	
		socket.emit(channel,message);
	});
});