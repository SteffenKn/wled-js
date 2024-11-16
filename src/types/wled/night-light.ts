// Nightlight settings within WLEDState
export type WLEDNightlight = {
  /** Nightlight enabled (true/false) */
  on: boolean;
  /** Duration of nightlight in minutes */
  dur: number;
  /** Mode of nightlight (e.g., fade) */
  mode: number;
  /** Target brightness for nightlight */
  tbri: number;
  /** Remaining time for nightlight in seconds */
  rem: number;
};
