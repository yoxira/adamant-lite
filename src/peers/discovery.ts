import { PeerAPI } from './api.js';

interface Peer {
  ip: string;
  port: number;
}

export class Peers {
  private peers: Peer[];

  constructor(peers: Peer[]) {
    this.peers = peers;
  }

  async discover() {
    const peer = this.randomPeer();
    const response = await peer.getPeers();
    const { peers: discoveredPeers } = response;
    return discoveredPeers;
  }

  randomPeer() {
    const { peers } = this;
    const randomPeer = peers[Math.floor(peers.length * Math.random())];

    if (randomPeer === undefined) {
      throw new Error('No sustainable peers');
    }

    return new PeerAPI(randomPeer);
  }
}
