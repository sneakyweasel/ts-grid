import Edge from './Edge';
import ScreenCoordinate from './ScreenCoordinate';
import Tile from './Tile';
import Vertex from './Vertex';

/**
 * Square grid is a grid with a square shape.
 */
export default class SquareGrid {
  readonly tile_s = [''];
  readonly edge_s = ['W', 'N'];
  readonly vertex_s = [''];
  readonly scale: number;

  constructor(scale: number) {
    this.scale = scale;
  }

  /**
   * Convert a vertex to a screen coordinate.
   * @param vertex
   * @returns a screen coordinate
   */
  vertexToScreen(vertex: Vertex): ScreenCoordinate {
    return new ScreenCoordinate(vertex.q * this.scale, vertex.r * this.scale);
  }

  /**
   * Returns the tile at the given grid coordinate.
   * @param tile
   * @returns neighboring tiles
   */
  neighbors(tile: Tile): readonly [Tile, Tile, Tile, Tile] {
    const { q, r } = tile;
    return [
      new Tile(q, r - 1),
      new Tile(q - 1, r),
      new Tile(q, r + 1),
      new Tile(q + 1, r),
    ];
  }

  /**
   * Returns the tiles bordering the given tile.
   * @param tile
   * @returns bordering tiles
   */
  borders(tile: Tile): readonly [Edge, Edge, Edge, Edge] {
    const { q, r } = tile;
    return [
      new Edge(q, r, 'N'),
      new Edge(q, r, 'W'),
      new Edge(q, r + 1, 'N'),
      new Edge(q + 1, r, 'W'),
    ];
  }

  /**
   * Returns the corner vertices at the given tile.
   * @param tile
   * @returns corner vertices of the tile
   */
  corners(tile: Tile): readonly [Vertex, Vertex, Vertex, Vertex] {
    const { q, r } = tile;
    return [
      new Vertex(q, r),
      new Vertex(q, r + 1),
      new Vertex(q + 1, r + 1),
      new Vertex(q + 1, r),
    ];
  }

  /**
   * Returns the tile at both ends of the given edge.
   * @param edge
   * @returns tiles at both ends of the edge
   */
  joins(edge: Edge): readonly Tile[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'N':
        return [new Tile(q, r - 1), new Tile(q, r)];
      case 'W':
        return [new Tile(q, r), new Tile(q - 1, r)];
    }
    return [];
  }

  /**
   * Returns edges continuing the given edge.
   * @param edge
   * @returns edges continuing the given edge
   */
  continues(edge: Edge): readonly Edge[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'N':
        return [new Edge(q - 1, r, 'N'), new Edge(q + 1, r, 'N')];
      case 'W':
        return [new Edge(q, r - 1, 'W'), new Edge(q, r + 1, 'W')];
    }
    return [];
  }

  /**
   * Returns the vertices endpoints of the given edge.
   * @param edge
   * @returns vertices endpoints of the given edge
   */
  endpoints(edge: Edge): readonly Vertex[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'N':
        return [new Vertex(q + 1, r), new Vertex(q, r)];
      case 'W':
        return [new Vertex(q, r), new Vertex(q, r + 1)];
    }
    return [];
  }

  /**
   * Returns the tiles bordering the given vertex.
   * @param vertex
   * @returns tiles bordering the given vertex
   */
  touches(vertex: Vertex): readonly [Tile, Tile, Tile, Tile] {
    const { q, r } = vertex;
    return [
      new Tile(q, r),
      new Tile(q, r - 1),
      new Tile(q - 1, r - 1),
      new Tile(q - 1, r),
    ];
  }

  /**
   * Returns the edges protruding the given vertex.
   * @param vertex
   * @returns edges protruding the given vertex
   */
  protrudes(vertex: Vertex): readonly [Edge, Edge, Edge, Edge] {
    const { q, r } = vertex;
    return [
      new Edge(q, r, 'W'),
      new Edge(q, r, 'N'),
      new Edge(q, r - 1, 'W'),
      new Edge(q - 1, r, 'N'),
    ];
  }

  /**
   * Returns the vertices adjacent to the given vertex.
   * @param vertex
   * @returns vertices adjacent to the given vertex
   */
  adjacent(vertex: Vertex): readonly [Vertex, Vertex, Vertex, Vertex] {
    const { q, r } = vertex;
    return [
      new Vertex(q, r + 1),
      new Vertex(q + 1, r),
      new Vertex(q, r - 1),
      new Vertex(q - 1, r),
    ];
  }
}
