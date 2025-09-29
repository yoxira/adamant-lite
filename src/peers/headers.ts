type HeadersInit = Record<string, string>;

interface PeerAPIHeaders {
  nethash: string;
  port: number;
}

/**
 * ADAMANT peer API requires headers to include nethash and port.
 */
export class HandshakeHeaders {
  private static headers: HeadersInit = {};

  static setHeaders(headers: PeerAPIHeaders) {
    this.headers = {
      ...headers,
      port: String(headers.port),
    };
  }

  static getHeaders(): HeadersInit {
    return this.headers;
  }
}
