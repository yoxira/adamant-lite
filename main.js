import { config } from './config.js';
import { Peers } from './peers/discovery.js';

start();

async function start() {
  const headers = {
    nethash: config.nethash,
    port: config.port,
    version: config.version,
  };

  const peers = new Peers(config.peers);
  const discoveredPeers = await peers.discover({ headers });

  console.log(discoveredPeers);
}
