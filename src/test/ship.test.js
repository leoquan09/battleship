import { newShip } from '../modules/ship.js';

test('can create ship and get length', () => {
    const ship = newShip(4);
    expect(ship.getLength()).toBe(4);
});

test('can take hits', () => {
    const ship = newShip(4);
    ship.hit();
    expect(ship.getHits()).toBe(1);
})

test('will sink', () => {
    const ship = newShip(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})
