import {WLEDFileSystem, WLEDLEDSettings, WLEDMap, WLEDWifi} from './index';

// WLED device information
export type WLEDInfo = {
  /** Version of WLED firmware */
  ver: string;
  /** Version ID */
  vid: number;
  /** LED settings */
  leds: WLEDLEDSettings;
  /** Is strip connected */
  str: boolean;
  /** Device name */
  name: string;
  /** UDP port */
  udpport: number;
  /** Live status */
  live: boolean;
  /** Live segment */
  liveseg: number;
  /** Live mode */
  lm: string;
  /** IP of the live data source */
  lip: string;
  /** WebSocket connections */
  ws: number;
  /** Number of effects */
  fxcount: number;
  /** Number of palettes */
  palcount: number;
  /** Number of custom palettes */
  cpalcount: number;
  /** Mapping settings */
  maps: WLEDMap[];
  /** WiFi settings */
  wifi: WLEDWifi;
  /** File system information */
  fs: WLEDFileSystem;
  /** Number of devices connected */
  ndc: number;
  /** Device architecture */
  arch: string;
  /** Core version */
  core: string;
  /** LWIP version */
  lwip: number;
  /** Free heap memory */
  freeheap: number;
  /** Uptime in seconds */
  uptime: number;
  /** Current time */
  time: string;
  /** Options bitfield */
  opt: number;
  /** Device brand */
  brand: string;
  /** Device product */
  product: string;
  /** Device MAC address */
  mac: string;
  /** Device IP address */
  ip: string;
};
