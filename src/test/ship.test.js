import { newShip } from '../modules/ship.js';

test('can create ship and get length', () => {
    const ship = newShip(4, 'cruiser');
    expect(ship.length).toBe(4);
});

test('can take hits', () => {
    const ship = newShip(4, 'cruiser');
    ship.hit();
    expect(ship.getHits()).toBe(1);
})

test('will sink', () => {
    const ship = newShip(2, 'cruiser');
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})
