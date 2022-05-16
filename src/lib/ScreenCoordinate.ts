export default class ScreenCoordinate {
    readonly x: number;
    readonly y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(p: ScreenCoordinate): boolean {
        if (this.x == p.x) {
            return this.y == p.y;
        } else {
            return false;
        }
    }

    toString(): string {
        return this.x + "," + this.y;
    }

    length_squared(): number {
        return this.x * this.x + this.y * this.y;
    }

    length(): number {
        return Math.sqrt(this.length_squared());
    }

    normalize(): ScreenCoordinate {
        const d = this.length();
        return new ScreenCoordinate(this.x / d, this.y / d);
    }

    scale(d: number): ScreenCoordinate {
        return new ScreenCoordinate(this.x * d, this.y * d);
    }

    rotateLeft(): ScreenCoordinate {
        return new ScreenCoordinate(this.y, -this.x);
    }

    rotateRight(): ScreenCoordinate {
        return new ScreenCoordinate(-this.y, this.x);
    }

    add(p: ScreenCoordinate): ScreenCoordinate {
        return new ScreenCoordinate(this.x + p.x, this.y + p.y);
    }

    subtract(p: ScreenCoordinate): ScreenCoordinate {
        return new ScreenCoordinate(this.x - p.x, this.y - p.y);
    }

    dot(p: ScreenCoordinate): number {
        return this.x * p.x + this.y * p.y;
    }

    cross(p: ScreenCoordinate): number {
        return this.x * p.y - this.y * p.x;
    }

    distance(p: ScreenCoordinate): number {
        return this.subtract(p).length();
    }
}