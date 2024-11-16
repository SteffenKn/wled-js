export type DdpPacket = {
  /** DDP-Header */
  header: Buffer;
  /** LED-Daten */
  data: Buffer;
};
