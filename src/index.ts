import {ApiClient, DdpClient, WebsocketClient} from './api/index';

import {
  WLEDStateCallback,
  WLEDLiveStreamCallback,
  WLEDState,
  WLEDFullResponse,
  WebsocketAddResponse,
  WLEDConfig,
  WLEDInfo,
  WLEDNetworkResponse,
  WLEDNodesResponse,
  WLEDStateAndInfoResponse,
  LedStrip,
  DdpPacket,
} from './types/index';

export default class WledClient {
  private apiClient: ApiClient;
  private websocketClient: WebsocketClient;
  private ddpClient: DdpClient;

  constructor(ip: string) {
    this.apiClient = new ApiClient(ip);
    this.websocketClient = new WebsocketClient(ip);
    this.ddpClient = new DdpClient(ip);
  }

  // [Websocket] Connecting and disconnecting
  // These are optional to use, because when you use the onStateChange or onLiveStreamData methods, the client will automatically connect to the websocket.
  // Also the client will automatically disconnect from the websocket when the last listener is removed, but only if the user did not manually connect to the websocket.

  public connect(): Promise<void> {
    return this.websocketClient.connect();
  }

  public disconnect(): void {
    this.ddpClient.disconnect();

    return this.websocketClient.disconnect();
  }

  // [API] Setters

  public turn(on: boolean): Promise<void> {
    const state = {
      on: on,
    };

    return this.updateState(state);
  }

  public updateState(state: Partial<WLEDState>): Promise<void> {
    return this.apiClient.updateState(state);
  }

  public setBrightness(brightness: number): Promise<void> {
    const state = {
      bri: Math.min(255, Math.max(0, brightness)),
    };

    return this.updateState(state);
  }

  // [API] Getters

  public getAllData(): Promise<WLEDFullResponse> {
    return this.apiClient.getAllData();
  }

  public getState(): Promise<WLEDState> {
    return this.apiClient.getState();
  }

  public getEffects(): Promise<string[]> {
    return this.apiClient.getEffects();
  }

  public getFxData(): Promise<string[]> {
    return this.apiClient.getFxData();
  }

  public getNetworks(): Promise<WLEDNetworkResponse> {
    return this.apiClient.getNetworks();
  }

  public getPalettes(): Promise<string[]> {
    return this.apiClient.getPalettes();
  }

  public getConfig(): Promise<WLEDConfig> {
    return this.apiClient.getConfig();
  }

  public getInfo(): Promise<WLEDInfo> {
    return this.apiClient.getInfo();
  }

  public getNodes(): Promise<WLEDNodesResponse> {
    return this.apiClient.getNodes();
  }

  public getStateAndInfo(): Promise<WLEDStateAndInfoResponse> {
    return this.apiClient.getStateAndInfo();
  }

  // [Websocket] Triggers
  // These methods are used to trigger specific actions on the WLED device, both related to the listeners.

  public triggerWebsocketStateUpdate(): Promise<void> {
    return this.websocketClient.send({v: true});
  }

  public triggerWebsocketLiveStream(): Promise<void> {
    return this.websocketClient.send({lv: true});
  }

  // [Websocket] Listeners
  // These methods are used to add listeners to the websocket client.

  public onStateChange(callback: WLEDStateCallback): WebsocketAddResponse {
    return this.websocketClient.onStateChange(callback);
  }

  public onLiveStreamData(callback: WLEDLiveStreamCallback): WebsocketAddResponse {
    return this.websocketClient.onLiveStreamData(callback);
  }

  // [DDP] Send
  // These methods are used to send data to the WLED device using the DDP protocol.
  public setLedStripViaDdp(ledStrip: LedStrip, disableValidation = false): Promise<void> {
    return this.ddpClient.setLedStrip(ledStrip, disableValidation);
  }

  public setLedStripAsBufferViaDdp(ledStrip: Buffer, ledAmount: number): Promise<void> {
    return this.ddpClient.setLedStripByBuffer(ledStrip, ledAmount);
  }

  public sendDdpPacket(packet: DdpPacket): Promise<void> {
    return this.ddpClient.sendDdpPacket(packet);
  }
}

export * from './types/index';
