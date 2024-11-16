# wled-js

Simple JavaScript client for WLED with support for JSON API, Websocket and DDP.

## Installation

Use npm to install the package:

```sh
npm install wled-js
```

## Getting Started

Here is an example of how you can use the `WledClient` to connect to a WLED device and perform some basic operations:

```ts
import WledClient from 'wled-js';

// Create a new WLED client
const client = new WledClient('XXX.XXX.XXX.XXX');

// Turn on the WLED device
client.turn(true).then(() => {
  console.log('WLED device is now on');
});

// Set the brightness to 128
client.setBrightness(128).then(() => {
  console.log('Brightness set to 128');
});

// Listen for live data
client.onLiveStreamData((colors) => {
  console.log('Live stream data:', colors);
});

// Trigger the live stream
client.triggerWebsocketLiveStream();

const ledStrip = [
  {r: 255, g: 0, b: 0},
  {r: 0, g: 255, b: 0},
  {r: 0, g: 0, b: 255},
];

// Set the colors of the LED strip via DDP
setInterval(() => {
  client.setColors(ledStrip);
}, 500);
```

## API

### WledClient

#### JSON API Methods

- `turn(on: boolean): Promise<void>`: Turns on/off the LED strip.
- `setColor(color: Led): Promise<void>`: Sets the color of the whole LED strip.
- `setEffect(effect: string | number): Promise<void>`: Sets the effect of the LED strip (This can be the name or the index of the effect).
- `setBrightness(brightness: number): Promise<void>`: Sets the brightness of the LED strip.
- `updateState(state: PartialWLEDState): Promise<void>`: Updates the state of the WLED device.
- `getLedCount(): Promise<number>`: Retrieves the amount of LEDs from the WLED device.
- `getAllData(): Promise<WLEDFullResponse>`: Retrieves all data from the WLED device.
- `getState(): Promise<WLEDState>`: Retrieves the current state of the WLED device.
- `getEffects(): Promise<string[]>`: Retrieves the available effects from the WLED device.
- `getFxData(): Promise<string[]>`: Retrieves the FX data from the WLED device.
- `getNetworks(): Promise<WLEDNetworkResponse>`: Retrieves the available networks from the WLED device.
- `getPalettes(): Promise<string[]>`: Retrieves the available palettes from the WLED device.
- `getConfig(): Promise<WLEDConfig>`: Retrieves the configuration of the WLED device.
- `getInfo(): Promise<WLEDInfo>`: Retrieves the information of the WLED device.
- `getNodes(): Promise<WLEDNodesResponse>`: Retrieves the available nodes from the WLED device.
- `getStateAndInfo(): Promise<WLEDStateAndInfoResponse>`: Retrieves the state and information of the WLED device.

#### Websocket Methods

- `triggerWebsocketStateUpdate(): Promise<void>`: Triggers a state update via WebSocket.
- `triggerWebsocketLiveStream(): Promise<void>`: Triggers a live stream via WebSocket.
- `onStateChange(callback: WLEDStateCallback): WebsocketAddResponse`: Adds a listener for state changes.
- `onLiveStreamData(callback: WLEDLiveStreamCallback): WebsocketAddResponse`: Adds a listener for live stream data.

Optional:

- `connect(): Promise<void>`: Manually connects to the WebSocket server.
- `disconnect(): void`: Disconnects from the WebSocket server.
  > The connect and disconnect functions are not necessary to call manually, as they are automatically called when using the `onStateChange` and `onLiveStreamData` methods.
  > However, they can be used to manually connect and disconnect from the WebSocket server.

#### DDP Methods

- `setLedStripViaDdp(ledStrip: LedStrip, disableValidation = false): Promise<void>`: Sends LED data via the DDP protocol.
- `setLedStripAsBufferViaDdp(ledStrip: Buffer, ledAmount: number): Promise<void>`: Sends LED data as a buffer via the DDP protocol.
- `sendDdpPacket(packet: DdpPacket): Promise<void>`: Sends a DDP packet.
