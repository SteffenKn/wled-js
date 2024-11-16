// UDP settings within WLEDState
export type WLEDUdpn = {
  /** Whether to send UDP packets */
  send: boolean;
  /** Whether to receive UDP packets */
  recv: boolean;
  /** UDP send group */
  sgrp: number;
  /** UDP receive group */
  rgrp: number;
};
