// LED-specific settings within WLEDInfo
export type WLEDLEDSettings = {
  /** Number of LEDs */
  count: number;
  /** Power consumption in mW */
  pwr: number;
  /** Frames per second */
  fps: number;
  /** Maximum power in mW */
  maxpwr: number;
  /** Maximum segments */
  maxseg: number;
  /** Segment load count */
  seglc: number[];
  /** Load count */
  lc: number;
  /** RGBW mode enabled */
  rgbw: boolean;
  /** White channel voltage */
  wv: number;
  /** Color temperature */
  cct: number;
};
