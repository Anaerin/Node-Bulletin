`use strict`
import dgram from "dgram";

/*
 *
 * IMPORTANT NOTE: Broadcast does not currently work between Docker hosts, only within a single host.
 *
 */

const PORT = 65534;

class Broadcast {
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
			this.#socket.bind(PORT);
		}
	}
	static send(message) {
		let sock = dgram.createSocket("udp4");
		sock.bind(() => {
			sock.setBroadcast(true);
		});
		const msgBuffer = Buffer.from(message);
		sock.send(msgBuffer, 0, msgBuffer.length, PORT, "255.255.255.255", () => {
			sock.close();
		});
	}
	send(message) {
		Broadcast.send(message);
	}
}

export default Broadcast;