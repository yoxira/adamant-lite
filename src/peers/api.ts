import { HandshakeHeaders } from './headers.js';

interface PeerAPIOptions {
  ip: string;
  port: number;
}

/**
 * Transport API client for communication between peers.
 */
export class PeerAPI {
  private readonly ip: string;
  private readonly port: number;

  private readonly baseUrl: string;

  private timeoutMs = 10000;

  /**
   * @param options Configuration for the Peer API client.
   */
  constructor(options: PeerAPIOptions) {
    this.ip = options.ip;
    this.port = options.port;

    this.baseUrl = `http://${this.ip}:${this.port}`;
  }

  /**
   * Internal helper to perform a fetch request with:
   * - peer headers attached
   * - timeout handling via AbortController
   * - standardized JSON parsing + error handling
   */
  private async request<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...init,
        headers: {
          ...init?.headers,
          ...HandshakeHeaders.getHeaders(),
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(id);
    }
  }

  /**
   * Retrieves a list of peers from the connected node.
   */
  async getPeers(): Promise<{ peers: any[] }> {
    const peers = await this.request<{ peers: any[] }>('/peer/list');
    return peers;
  }

  /**
   * Fetches the status of the connected peer node.
   */
  async getStatus(): Promise<any> {
    return this.request('/status');
  }
}
