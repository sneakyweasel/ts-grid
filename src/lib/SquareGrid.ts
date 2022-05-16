import Edge from './Edge';
import ScreenCoordinate from "./ScreenCoordinate";
import Tile from './Tile';
import Vertex from './Vertex';

export default class SquareGrid {
    readonly tile_s = ['']
    readonly edge_s = ['W', 'N']
    readonly vertex_s = ['']
    readonly scale: number;
    
    constructor(scale: number) {
        this.scale = scale;
    }

    vertexToScreen(vertex: Vertex): ScreenCoordinate {
        return new ScreenCoordinate(vertex.q * this.scale,
                                    vertex.r * this.scale);
    }

    neighbors(tile: Tile): readonly [Tile, Tile, Tile, Tile] {
        const {q, r} = tile;
        return [
            new Tile(q, r - 1),
            new Tile(q - 1, r),
            new Tile(q, r + 1),
            new Tile(q + 1, r),
        ];
    }

    borders(tile: Tile): readonly [Edge, Edge, Edge, Edge] {
        const {q, r} = tile;
        return [
            new Edge(q, r, 'N'),
            new Edge(q, r, 'W'),
            new Edge(q, r + 1, 'N'),
            new Edge(q + 1, r, 'W'),
        ];
    }

    corners(tile: Tile): readonly [Vertex, Vertex, Vertex, Vertex] {
        const {q, r} = tile;
        return [
            new Vertex(q, r),
            new Vertex(q, r + 1),
            new Vertex(q + 1, r + 1),
            new Vertex(q + 1, r),
        ];
    }

    joins(edge: Edge): readonly Tile[] {
        const {q, r, s} = edge;
        switch (s) {
        case 'N':
            return [new Tile(q, r - 1), new Tile(q, r)];
        case 'W':
            return [new Tile(q, r), new Tile(q - 1, r)];
        }
        return [];
    }

    continues(edge: Edge): readonly Edge[] {
        const {q, r, s} = edge;
        switch (s) {
        case 'N':
            return [new Edge(q - 1, r, 'N'), new Edge(q + 1, r, 'N')];
        case 'W':
            return [new Edge(q, r - 1, 'W'), new Edge(q, r + 1, 'W')];
        }
        return [];
    }

    endpoints(edge: Edge): readonly Vertex[] {
        const {q, r, s} = edge;
        switch (s) {
        case 'N':
            return [new Vertex(q + 1, r), new Vertex(q, r)];
        case 'W':
            return [new Vertex(q, r), new Vertex(q, r + 1)];
        }
        return [];
    }

    touches(vertex: Vertex): readonly [Tile, Tile, Tile, Tile] {
        const {q, r} = vertex;
        return [
            new Tile(q, r),
            new Tile(q, r - 1),
            new Tile(q - 1, r - 1),
            new Tile(q - 1, r),
        ];
    }

    protrudes(vertex: Vertex): readonly [Edge, Edge, Edge, Edge] {
        const {q, r} = vertex;
        return [
            new Edge(q, r, 'W'),
            new Edge(q, r, 'N'),
            new Edge(q, r - 1, 'W'),
            new Edge(q - 1, r, 'N'),
        ];
    }

    adjacent(vertex: Vertex): readonly [Vertex, Vertex, Vertex, Vertex] {
        const {q, r} = vertex;
        return [
            new Vertex(q, r + 1),
            new Vertex(q + 1, r),
            new Vertex(q, r - 1),
            new Vertex(q - 1, r),
        ];
    }
}