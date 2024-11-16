import {WLEDNightlight, WLEDSegment, WLEDUdpn} from './index';

// WLED state configuration
export type WLEDState = {
  /** Power state (on/off) */
  on: boolean;
  /** Brightness level (0-255) */
  bri: number;
  /** Transition time in tenths of a second */
  transition: number;
  /** Current preset */
  ps: number;
  /** Current playlist */
  pl: number;
  /** Nightlight settings */
  nl: WLEDNightlight;
  /** UDP settings */
  udpn: WLEDUdpn;
  /** Live override mode */
  lor: number;
  /** Main segment ID */
  mainseg: number;
  /** Array of segment configurations */
  seg: WLEDSegment[];
};
