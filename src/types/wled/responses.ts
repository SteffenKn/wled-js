import {WLEDInfo, WLEDNetwork, WLEDNode, WLEDState} from './index';

// Full WLED response structure
export type WLEDFullResponse = {
  /** State configuration */
  state: WLEDState;
  /** Device information */
  info: WLEDInfo;
  /** List of available effects */
  effects: string[];
  /** List of available palettes */
  palettes: string[];
};

// WLED response structure for effects
export type WLEDEffectsResponse = string[];

// WLED response structure for si
export type WLEDStateAndInfoResponse = {
  /** State configuration */
  state: WLEDState;
  /** Device information */
  info: WLEDInfo;
};

// WLED response structure for nodes
export type WLEDNodesResponse = {
  /** List of nodes */
  nodes: WLEDNode[];
};

// TODO: Unsure about this type
// WLED response structure for palx
export type WLEDPalettesXResponse = {
  /** Mapping mode */
  m: number;
  /** Mapping patterns */
  p: {
    '0': [number, number, number, number][];
    '1': string[];
    '2': string[];
    '3': string[];
    '4': string[];
    '5': string[];
    '6': [number, number, number, number][];
    '7': [number, number, number, number][];
  };
};

// WLED response structure for fxData
export type WLEDFxDataResponse = string[];

// WLED response structure for net
export type WLEDNetworkResponse = {
  networks: WLEDNetwork[];
};

// WLED response structure for live
export type WLEDLiveResponse = {
  /**
   * Array of hexadecimal color values for each LED.
   * Each value represents the color of an LED in the "RRGGBB" format.
   * Example: "000000" for black (off), "FF0000" for red.
   */
  leds: string[];
  /**
   * Unknown property, possibly representing the number of active connections.
   * Possible values: 2 might indicate an active connection or a specific mode.
   */
  n: number;
};

// WLED response structure for palettes
export type WLEDPalettesResponse = string[];
