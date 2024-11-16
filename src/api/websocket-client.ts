import WebSocket from 'ws';

import {generateId} from '../utils';

import {WebsocketAddResponse, WLEDLiveStreamCallback, WLEDStateCallback} from '../types/index';

export type StateListenerMap = {
  [key: string]: WLEDStateCallback;
};
export type LiveStreamListenerMap = {
  [key: string]: WLEDLiveStreamCallback;
};

export class WebsocketClient {
  private ip: string;
  private ws: WebSocket;

  private manuallyConnected: boolean = false;

  private liveStreamListeners: LiveStreamListenerMap = {};
  private stateListeners: StateListenerMap = {};

  private connectionPromise: Promise<void>;

  constructor(ip: string) {
    this.ip = ip;
  }

  public async connect() {
    this.manuallyConnected = true;

    return this._connect();
  }

  public disconnect() {
    this.manuallyConnected = false;

    if (!this.ws) {
      return;
    }

    this.ws.close();

    delete this.ws;
  }

  public async send(data: any): Promise<void> {
    if (!this.ws) {
      throw new Error('Websocket not connected');
    }

    await this.connectionPromise;

    this.ws.send(JSON.stringify(data));
  }

  public onStateChange(callback: WLEDStateCallback): WebsocketAddResponse {
    if (!this.ws) {
      this._connect();
    }

    const id = generateId(8);

    this.stateListeners[id] = callback;

    return {
      stop: () => this.removeListener(id),
    };
  }

  public onLiveStreamData(callback: WLEDLiveStreamCallback): WebsocketAddResponse {
    if (!this.ws) {
      this._connect();
    }

    const id = generateId(8);

    this.liveStreamListeners[id] = callback;

    return {
      stop: () => this.removeListener(id),
    };
  }

  private removeListener(id: string): void {
    delete this.stateListeners[id];
    delete this.liveStreamListeners[id];

    const noListenersExist = Object.keys(this.stateListeners).length === 0 && Object.keys(this.liveStreamListeners).length === 0;
    if (noListenersExist && !this.manuallyConnected) {
      this.disconnect();
    }
  }

  private _connect() {
    this.ws = new WebSocket(`ws://${this.ip}/ws`);

    this.ws.addEventListener('message', ({data}: WebSocket.MessageEvent) => this.handleMessage(data));

    this.connectionPromise = new Promise<void>((resolve, reject) => {
      this.ws.onopen = () => {
        resolve();
      };

      this.ws.onerror = (error) => {
        reject(error);
      };
    });

    return this.connectionPromise;
  }

  private handleMessage(rawData: WebSocket.Data) {
    if (Buffer.isBuffer(rawData) || rawData instanceof ArrayBuffer) {
      const bufferData = Buffer.isBuffer(rawData) ? rawData : Buffer.from(rawData);

      const header = bufferData.subarray(0, 2);
      const type = String.fromCharCode(header[0]);
      const version = header[1];

      if (type !== 'L') {
        console.error('Websocket error: Unknown buffer type:', type);
        return;
      }

      if (version !== 1) {
        console.error('Websocket error: Unknown buffer version:', version);
        return;
      }

      const leds: Buffer[] = [];

      // Process LED data after the header
      const raw_leds = bufferData.subarray(2);
      for (let i = 0; i < raw_leds.length; i += 3) {
        leds.push(raw_leds.subarray(i, i + 3)); // Slice out each RGB triplet as a Buffer
      }

      // Convert the LED data to an array of hex strings
      const ledColors = leds.map((led) => led.toString('hex'));

      Object.values(this.liveStreamListeners).forEach((callback) => {
        callback(ledColors);
      });
    } else {
      const data = JSON.parse(rawData.toString());

      Object.values(this.stateListeners).forEach((callback) => {
        callback(data);
      });
    }
  }
}
