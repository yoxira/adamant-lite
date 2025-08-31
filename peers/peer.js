export class Peer {
  constructor({ ip, port }) {
    this.ip = ip;
    this.port = port;
  }

  fetch(method, endpoint, options) {
    return fetch(`http://${this.ip}:${this.port}${endpoint}`, {
      method,
      ...options,
    });
  }
}
