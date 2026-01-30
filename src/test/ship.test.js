import { newShip } from '../modules/ship.js';

test('can create ship and get length', () => {
    const ship = newShip(4);
    expect(ship.getLength()).toBe(4);
})