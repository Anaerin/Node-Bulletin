`use strict`
import Broadcast from "./lib/broadcast.js";
import Multicast from "./lib/multicast.js";
import process from "process";

let multicast = new Multicast(printMulticastMessage);
let broadcast = new Broadcast(printBroadcastMessage);

function printMulticastMessage(message) {
	console.info(`Got Multicast message: ${message}`);
}
function printBroadcastMessage(message) {
	console.info(`Got Broadcast message: ${message}`);
}

function sendMessages() {
	multicast.send(`Hello from ${process.pid}`);
	broadcast.send(`Hello from ${process.pid}`);
}

setInterval(sendMessages, 2500);