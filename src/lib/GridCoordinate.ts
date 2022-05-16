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

    get label(): string {
        const {q, r, s} = this;
        return `${q},${r}${s?',':''}${s}`;
    }

    get key(): string {
        return `${this.type}:${this.label}`;
    }
    
    toString(): string {
        return this.label;
    }
}