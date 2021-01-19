`use strict`
import dgram from "dgram";

/*
 *
 * IMPORTANT NOTE: Multicast does not currently work over Docker overlay networks.
 *
 */

class Multicast {
	#PORT = 65535;
	#MULTICAST_ADDR = "233.255.255.255";
	#socket;
	#connected = false;
	constructor(callback) {
		if (callback) this.callback = callback;
		this.#socket = dgram.createSocket({
			type: "udp4",
			reuseAddr: true
		});
		this.#connect();
		this.#socket.on("listening", () => {
			this.#socket.addMembership(this.#MULTICAST_ADDR);
			this.#connected = true;
		});
		this.#socket.on("close", () => {
			this.#connected = false;
			setTimeout(this.#connect, 1000);
		})
		this.#socket.on("message", (message, rinfo) => {
			if (this.callback) {
				this.callback(message, rinfo);
			}
		});
	}
	#connect = function() {
		if (!this.#connected) {
			this.#socket.bind(this.#PORT);
		}
	}
	send(message) {
		if (!this.#connected) throw new Error("Not connected to socket");
		const msgBuffer = Buffer.from(message);
		this.#socket.send(msgBuffer, 0, msgBuffer.length, this.#PORT, this.#MULTICAST_ADDR);
	}
}

export default Multicast;