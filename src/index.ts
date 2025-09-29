import { config } from './config.js';
import { Peers } from './peers/discovery.js';
import { HandshakeHeaders } from './peers/headers.js';

start();

async function start() {
  const headers = {
    nethash: config.nethash,
    port: config.port,
    version: config.version,
  };

  HandshakeHeaders.setHeaders(headers);

  const peers = new Peers(config.peers);
  const discoveredPeers = await peers.discover();

  console.log(discoveredPeers);
}
