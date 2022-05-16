import test from 'ava';

import GridCoordinate from './GridCoordinate';


test('coordinate creation', (t) => {
    const coordinate = new GridCoordinate(2, 3);
    t.is(coordinate.toString(), '2,3');
  });