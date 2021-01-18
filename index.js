`use strict`
import dgram from "dgram";
import process from "process";

const PORT = 20000;
const MULTICAST_ADDR = "233.255.255.255";
const socket = dgram.createSocket({
	type: "udp4",
	reuseAddr: true
});
socket.bind(PORT);
socket.on("listening", () => {
	socket.addMembership(MULTICAST_ADDR);
	socket.setMulticastLoopback(true);
	const address = socket.address;
	console.log(`UDP socket listening on ${address.address}:${address.port}, PID:${process.pid}`);
	setInterval(sendMessage, 2500);
});

socket.on("message", (message, rinfo) => {
	console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);
});

function sendMessage() {
	const message = Buffer.from(`Message from process ${process.pid}`);
	socket.send(message, 0, message.length, PORT, MULTICAST_ADDR, () => {
		console.log(`Sending message: ${message}`);
	});
}