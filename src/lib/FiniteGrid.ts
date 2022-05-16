import Edge from './Edge';
import ScreenCoordinate from './ScreenCoordinate';
import Tile from './Tile';
import Vertex from './Vertex';

export default class FiniteGrid {
    readonly grid;
    tiles: Tile[];
    edges: Edge[];
    vertices: Vertex[];
    lookupTile: Map<string, Tile>;
    lookupEdge: Map<string, Edge>;
    lookupVertex: Map<string, Vertex>;

    constructor(grid, shape) {
        this.grid = grid;
        this.tiles = shape;
        this.edges = [];
        this.vertices = [];
        this.lookupTile = new Map();
        this.lookupEdge = new Map();
        this.lookupVertex = new Map();

        //for (const tile of this.tiles) {
        this.tiles.map((tile) => {
            this.lookupTile.set(tile.key, tile);

            this.grid.borders(tile).map((edge: Edge) => {
                if (!this.lookupEdge.has(edge.key)) {
                    this.lookupEdge.set(edge.key, edge);
                    this.edges.push(edge);
                }
            });

            this.grid.corners(tile).map((vertex: Vertex) => {
                if (!this.lookupVertex.has(vertex.key)) {
                    this.lookupVertex.set(vertex.key, vertex);
                    this.vertices.push(vertex);
                }
            });
        });
    }

    vertexToScreen(vertex: Vertex): ScreenCoordinate {
        return this.grid.vertexToScreen(vertex);
    }

    neighbors(tile: Tile): readonly Tile[] {
        return FiniteGrid.filterBy(this.grid.neighbors(tile), this.lookupTile);
    }
    
    joins(edge: Edge): readonly Tile[] {
        return FiniteGrid.filterBy(this.grid.joins(edge), this.lookupTile);
    }
    
    touches(vertex: Vertex): readonly Tile[] {
        return FiniteGrid.filterBy(this.grid.touches(vertex), this.lookupTile);
    }
    
    borders(tile: Tile): readonly Edge[] {
        return FiniteGrid.filterBy(this.grid.borders(tile), this.lookupEdge);
    }
    
    continues(edge: Edge): readonly Edge[] {
        return FiniteGrid.filterBy(this.grid.continues(edge), this.lookupEdge);
    }
    
    protrudes(vertex: Vertex): readonly Edge[] {
        return FiniteGrid.filterBy(this.grid.protrudes(vertex), this.lookupEdge);
    }
    
    corners(tile: Tile): readonly Vertex[] {
        return FiniteGrid.filterBy(this.grid.corners(tile), this.lookupVertex);
    }
    
    endpoints(edge: Edge): readonly Vertex[] {
        return FiniteGrid.filterBy(this.grid.endpoints(edge), this.lookupVertex);
    }
    
    adjacent(vertex: Vertex): readonly Vertex[] {
        return FiniteGrid.filterBy(this.grid.adjacent(vertex), this.lookupVertex);
    }

    static rectangularShape(minQ: number, minR: number, maxQ: number, maxR: number): Tile[] {
        const tiles: Tile[] = [];
        for (let q = minQ; q <= maxQ; q++) {
            for (let r = minR; r <= maxR; r++) {
                tiles.push(new Tile(q, r));
            }
        }
        return tiles;
    }
    static hexagonalShape(size: number): Tile[] {
        const tiles = [];
        for (let q = 0; q <= 2 * size; q++) {
            for (let r = 0; r <= 2 * size; r++) {
                if (size <= q + r && q + r <= 3 * size) {
                    tiles.push(new Tile(q, r));
                }
            }
        }
        return tiles;
    }
    static parallelogramShapeWithTriangles(minQ: number, minR: number, maxQ: number, maxR: number): Tile[] {
        const tiles = [];
        for (let q = minQ; q <= maxQ; q++) {
            for (let r = minR; r <= maxR; r++) {
                tiles.push(new Tile(q, r, "L"));
                tiles.push(new Tile(q, r, "R"));
            }
        }
        return tiles;
    }
    static triangleShapeWithTriangles(size: number): Tile[] {
        const tiles = [];
        for (let q = 0; q <= size; q++) {
            for (let r = 0; r <= size; r++) {
                if (q + r <= size) {
                    tiles.push(new Tile(q, r, "L"));
                }
                if (q + r < size) {
                    tiles.push(new Tile(q, r, "R"));
                }
            }
        }
        return tiles;
    }

    static filterBy(array: any[], lookupMap: Map<string, Tile | Edge | Vertex>) {
        return array.filter(element => lookupMap.has(element.key));
    }
}
