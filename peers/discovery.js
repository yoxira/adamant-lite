import { Peer } from './peer.js';

export class Peers {
  constructor(peers) {
    this.peers = peers;
  }

  async discover({ headers }) {
    const peer = this.randomPeer();
    const response = await peer.fetch('GET', '/peer/list', { headers });
    const { peers: discoveredPeers } = await response.json();
    return discoveredPeers;
  }

  randomPeer() {
    const { peers } = this;
    const randomPeer = peers[Math.floor(peers.length * Math.random())];
    return new Peer(randomPeer);
  }
}
