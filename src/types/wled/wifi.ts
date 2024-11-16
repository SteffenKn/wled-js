// WiFi-specific settings within WLEDInfo
export type WLEDWifi = {
  /** BSSID of connected network */
  bssid: string;
  /** Received signal strength indicator */
  rssi: number;
  /** WiFi signal strength as a percentage */
  signal: number;
  /** WiFi channel */
  channel: number;
};
