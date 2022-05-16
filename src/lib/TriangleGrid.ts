import Edge from './Edge';
import ScreenCoordinate from './ScreenCoordinate';
import Tile from './Tile';
import Vertex from './Vertex';

const SQRT_3_2 = Math.sqrt(3) / 2;

export default class TriangleGrid {
  readonly tile_s = ['L', 'R'];
  readonly edge_s = ['E', 'N', 'W'];
  readonly vertex_s = [''];
  readonly scale: number;

  constructor(scale: number) {
    this.scale = scale;
  }

  vertexToScreen(vertex: Vertex): ScreenCoordinate {
    const x = (this.scale * (vertex.q + vertex.r * 0.5)) / SQRT_3_2;
    const y = this.scale * vertex.r;
    return new ScreenCoordinate(x, y);
  }

  neighbors(tile: Tile): readonly Tile[] {
    const { q, r, s } = tile;
    switch (s) {
      case 'L':
        return [
          new Tile(q, r, 'R'),
          new Tile(q, r - 1, 'R'),
          new Tile(q - 1, r, 'R'),
        ];
      case 'R':
        return [
          new Tile(q, r + 1, 'L'),
          new Tile(q + 1, r, 'L'),
          new Tile(q, r, 'L'),
        ];
    }
    return [];
  }

  borders(tile: Tile): readonly Edge[] {
    const { q, r, s } = tile;
    switch (s) {
      case 'L':
        return [new Edge(q, r, 'E'), new Edge(q, r, 'N'), new Edge(q, r, 'W')];
      case 'R':
        return [
          new Edge(q, r + 1, 'N'),
          new Edge(q + 1, r, 'W'),
          new Edge(q, r, 'E'),
        ];
    }
    return [];
  }

  corners(tile: Tile): readonly Vertex[] {
    const { q, r, s } = tile;
    switch (s) {
      case 'L':
        return [new Vertex(q, r + 1), new Vertex(q + 1, r), new Vertex(q, r)];
      case 'R':
        return [
          new Vertex(q + 1, r + 1),
          new Vertex(q + 1, r),
          new Vertex(q, r + 1),
        ];
    }
    return [];
  }

  joins(edge: Edge): readonly Tile[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'E':
        return [new Tile(q, r, 'R'), new Tile(q, r, 'L')];
      case 'N':
        return [new Tile(q, r, 'L'), new Tile(q, r - 1, 'R')];
      case 'W':
        return [new Tile(q, r, 'L'), new Tile(q - 1, r, 'R')];
    }
    return [];
  }

  continues(edge: Edge): readonly Edge[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'E':
        return [new Edge(q + 1, r - 1, 'E'), new Edge(q - 1, r + 1, 'E')];
      case 'N':
        return [new Edge(q + 1, r, 'N'), new Edge(q - 1, r, 'N')];
      case 'W':
        return [new Edge(q, r + 1, 'W'), new Edge(q, r - 1, 'W')];
    }
    return [];
  }

  endpoints(edge: Edge): readonly Vertex[] {
    const { q, r, s } = edge;
    switch (s) {
      case 'E':
        return [new Vertex(q + 1, r), new Vertex(q, r + 1)];
      case 'N':
        return [new Vertex(q + 1, r), new Vertex(q, r)];
      case 'W':
        return [new Vertex(q, r + 1), new Vertex(q, r)];
    }
    return [];
  }

  touches(vertex: Vertex): readonly Tile[] {
    const { q, r } = vertex;
    return [
      new Tile(q - 1, r, 'R'),
      new Tile(q, r, 'L'),
      new Tile(q, r - 1, 'R'),
      new Tile(q, r - 1, 'L'),
      new Tile(q - 1, r - 1, 'R'),
      new Tile(q - 1, r, 'L'),
    ];
  }

  protrudes(vertex: Vertex): readonly Edge[] {
    const { q, r } = vertex;
    return [
      new Edge(q, r, 'W'),
      new Edge(q, r, 'N'),
      new Edge(q, r - 1, 'E'),
      new Edge(q, r - 1, 'W'),
      new Edge(q - 1, r, 'N'),
      new Edge(q - 1, r, 'E'),
    ];
  }

  adjacent(vertex: Vertex): readonly Vertex[] {
    const { q, r } = vertex;
    return [
      new Vertex(q, r + 1),
      new Vertex(q + 1, r),
      new Vertex(q + 1, r - 1),
      new Vertex(q, r - 1),
      new Vertex(q - 1, r),
      new Vertex(q - 1, r + 1),
    ];
  }
}
