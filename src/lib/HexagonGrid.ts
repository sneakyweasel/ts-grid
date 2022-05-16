import Edge from './Edge';
import ScreenCoordinate from "./ScreenCoordinate";
import Tile from './Tile';
import Vertex from './Vertex';

const SQRT_3_2 = Math.sqrt(3) / 2;

export default class HexagonGrid {
    readonly tile_s = ['']
    readonly edge_s = ['NE', 'NW', 'W']
    readonly vertex_s = ['N', 'S']
    readonly scale: number;
    
    constructor(size: number) {
        this.scale = size;
    }
    
    vertexToScreen(vertex: Vertex): ScreenCoordinate {
        const {q, r, s} = vertex;
        const x = this.scale * (q + r / 2 + 1/2) / SQRT_3_2;
        const y = this.scale * (r + (s === 'S' ? 7/6 : -1/6));
        return new ScreenCoordinate(x, y);
    }
    
    neighbors(tile: Tile): readonly Tile[] {
        const {q, r} = tile;
        return [
            new Tile(q, r + 1),
            new Tile(q + 1, r),
            new Tile(q + 1, r - 1),
            new Tile(q, r - 1),
            new Tile(q - 1, r),
            new Tile(q - 1, r + 1),
        ];
    }
    
    borders(tile: Tile): readonly Edge[] {
        const {q, r} = tile;
        return [
            new Edge(q, r, 'NE'),
            new Edge(q, r, 'NW'),
            new Edge(q, r, 'W'),
            new Edge(q-1, r+1, 'NE'),
            new Edge(q, r+1, 'NW'),
            new Edge(q+1, r, 'W'),
        ];
    }
    
    corners(tile: Tile): readonly Vertex[] {
        const {q, r} = tile;
        return [
            new Vertex(q, r, 'N'),
            new Vertex(q, r-1, 'S'),
            new Vertex(q-1, r+1, 'N'),
            new Vertex(q, r, 'S'),
            new Vertex(q, r+1, 'N'),
            new Vertex(q+1, r-1, 'S'),
        ];
    }
    
    joins(edge: Edge): readonly Tile[] {
        const {q, r, s} = edge;
        switch (s) {
         case 'NE': return [
             new Tile(q+1, r-1),
             new Tile(q, r)
         ];
         case 'NW': return [
             new Tile(q, r),
             new Tile(q, r-1)
         ];
         case 'W':  return [
             new Tile(q, r),
             new Tile(q-1, r)
         ];
        }
        return [];
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    continues(_edge: unknown) {
        return [];
    }
    
    endpoints(edge: Edge): readonly Vertex[] {
        const {q, r, s} = edge;
        switch (s) {
         case 'NE': return [
             new Vertex(q+1, r-1, 'S'),
             new Vertex(q, r, 'N')
         ];
         case 'NW': return [
             new Vertex(q, r, 'N'),
             new Vertex(q, r-1, 'S')
         ];
         case 'W':  return [
             new Vertex(q, r-1, 'S'),
             new Vertex(q-1, r+1, 'N')
         ];
        }
        return [];
    }
    
    touches(vertex: Vertex): readonly Tile[] {
        const {q, r, s} = vertex;
        switch (s) {
         case 'N': return [
             new Tile(q+1, r-1),
             new Tile(q, r),
             new Tile(q, r-1)
         ];
         case 'S': return [
             new Tile(q, r),
             new Tile(q, r+1),
             new Tile(q-1, r+1)
         ];
        }
        return [];
    }
    
    protrudes(vertex: Vertex): readonly Edge[] {
        const {q, r, s} = vertex;
        switch (s) {
         case 'N': return [
             new Edge(q, r, 'NE'),
             new Edge(q+1, r-1, 'W'),
             new Edge(q, r, 'NW'),
         ];
         case 'S': return [
             new Edge(q, r+1, 'NW'),
             new Edge(q-1, r+1, 'NE'),
             new Edge(q, r+1, 'W'),
         ];
        }
        return [];
    }
    
    adjacent(vertex: Vertex): readonly Vertex[] {
        const {q, r, s} = vertex;
        switch (s) {
        case 'N':
            return [
                new Vertex(q+1, r-2, 'S'),
                new Vertex(q, r-1, 'S'),
                new Vertex(q+1, r-1, 'S'),
            ];
        case 'S':
            return [
                new Vertex(q-1, r+1, 'N'),
                new Vertex(q-1, r+2, 'N'),
                new Vertex(q, r+1, 'N'),
            ];
        }
        return [];
    }
}