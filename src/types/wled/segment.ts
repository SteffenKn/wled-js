// Segment settings within WLEDState
export type WLEDSegment = {
  /** Segment ID */
  id: number;
  /** Start LED for segment */
  start: number;
  /** Stop LED for segment */
  stop: number;
  /** Length of segment in LEDs */
  len: number;
  /** Grouping of LEDs */
  grp: number;
  /** Spacing between LED groups */
  spc: number;
  /** Offset for segment */
  of: number;
  /** Segment on/off state */
  on: boolean;
  /** Freeze segment state */
  frz: boolean;
  /** Segment brightness (0-255) */
  bri: number;
  /** Color temperature */
  cct: number;
  /** Voreinstellung */
  set: number;
  /** Color array for segment */
  col: [number, number, number][];
  /** Effect ID */
  fx: number;
  /** Effect speed */
  sx: number;
  /** Effect intensity */
  ix: number;
  /** Palette ID */
  pal: number;
  /** Parameter 1 for effect */
  c1: number;
  /** Parameter 2 for effect */
  c2: number;
  /** Parameter 3 for effect */
  c3: number;
  /** Segment selected */
  sel: boolean;
  /** Segment reversed */
  rev: boolean;
  /** Segment reacts to music */
  mi: boolean;
  /** Additional option 1 */
  o1: boolean;
  /** Additional option 2 */
  o2: boolean;
  /** Additional option 3 */
  o3: boolean;
  /** Secondary intensity */
  si: number;
  /** Music loudness mode */
  m12: number;
};
