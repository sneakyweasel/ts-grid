/**
 * Grid coordinate
 */
export default class GridCoordinate {
  readonly q: number;

  readonly r: number;

  readonly s: string;

  readonly type: string;

  constructor(q: number, r: number, s = '', type = 'none') {
    this.q = q;
    this.r = r;
    this.s = s;
    this.type = type;
  }

  /**
   * Creates a string describing the coordinate.
   * @returns coordinate string
   */
  get label(): string {
    const { q, r, s } = this;
    return `${q},${r}${s ? ',' : ''}${s}`;
  }

  /**
   * Creates a key string for the coordinate.
   * @returns key string
   */
  get key(): string {
    return `${this.type}:${this.label}`;
  }

  /**
   * Override toString() for the coordinate.
   * @returns coordinate string
   */
  toString(): string {
    return this.label;
  }
}
