import { newShip } from '../modules/ship.js';
import { gameboard } from '../modules/gameboard.js';

it('is able to place ship in the right spot', () => {
    const myShip = newShip(2, 'cruiser');
    const testGameBoard = gameboard();

    testGameBoard.placeShip(myShip, 2, 2, true);
    
    let location = testGameBoard.getShipLocation(myShip);

    expect(location).toEqual([
        { x: 2, y: 2 }, 
        { x: 2, y: 3 }
    ]);
});

it('can recive attacks', () => {
    const myShip = newShip(2, 'cruiser');
    const testGameBoard = gameboard();

    testGameBoard.placeShip(myShip, 2, 2, true);

    expect(testGameBoard.receiveAttack(2, 2)).toBe('hit'); 
    expect(testGameBoard.receiveAttack(2, 3)).toBe('hit');
});

it('records missed shots correctly', () => {
    const testGameboard = gameboard();

    const attackResult = testGameboard.receiveAttack(5, 5);

    expect(attackResult).toBe('miss');

    expect(testGameboard.getMisses()).toMatchObject([{ x: 5, y: 5 }]);
});

it('should not allow ships to overlap', () => {
    const testGameboard = gameboard();
    const ship1 = newShip(3);
    const ship2 = newShip(3);

    testGameboard.placeShip(ship1, 0, 0, true);

    const isPlacementSuccessful = testGameboard.placeShip(ship2, 0, 0, false);

    expect(isPlacementSuccessful).toBe(false);
});

it('should not allow ships to be placed out of bounds', () => {
    const testGameboard = gameboard();
    const longShip = newShip(5);

    const isPlacementSuccessful = testGameboard.placeShip(longShip, 20, 0, true);

    expect(isPlacementSuccessful).toBe(false);
});

it.skip('should not allow hitting the same coordinate twice', () => {
    const testGameboard = gameboard();
    const ship = newShip(2);
    testGameboard.placeShip(ship, 0, 0, true);

    testGameboard.receiveAttack(0, 0); 
    
    const secondAttack = testGameboard.receiveAttack(0, 0);
    
    expect(secondAttack).toBe('already attacked');
});

it.skip('should track multiple missed shots', () => {
    const testGameboard = gameboard();

    testGameboard.receiveAttack(1, 1);
    testGameboard.receiveAttack(5, 5);
    testGameboard.receiveAttack(9, 9);

    const misses = testGameboard.getMisses();
    expect(misses).toContainEqual({ x: 1, y: 1 });
    expect(misses).toContainEqual([5, 5]);
    expect(misses).toContainEqual([9, 9]);
    expect(misses.length).toBe(3);
});

it.skip('reports when all ships have been sunk', () => {
    const testGameboard = gameboard();
    const ship1 = newShip(1);
    const ship2 = newShip(2);

    testGameboard.placeShip(ship1, 0, 0, true);
    testGameboard.placeShip(ship2, 5, 5, true);

    testGameboard.receiveAttack(0, 0);

    testGameboard.receiveAttack(5, 5);
    testGameboard.receiveAttack(6, 5);

    expect(testGameboard.allShipsSunk()).toBe(true);
});

it.skip('allShipsSunk should return false if some ships are still afloat', () => {
    const testGameboard = gameboard();
    const ship1 = newShip(1);
    const ship2 = newShip(2);

    testGameboard.placeShip(ship1, 0, 0, true);
    testGameboard.placeShip(ship2, 5, 5, true);

    // Sink only the first ship
    testGameboard.receiveAttack(0, 0);

    expect(testGameboard.allShipsSunk()).toBe(false);
});

it.skip('should call hit() on the correct ship when attacked', () => {
    const testGameboard = gameboard();
    const ship1 = newShip(2);
    const ship2 = newShip(3);

    testGameboard.placeShip(ship1, 0, 0, true);  // [0,0], [0,1]
    testGameboard.placeShip(ship2, 5, 5, false); // [5,5], [6,5], [7,5]

    // Attack ship1
    testGameboard.receiveAttack(0, 1);

    // If your ship object has a way to check hits, use that.
    // Let's assume ship.getHits() returns the number of hits.
    expect(ship1.getHits()).toBe(1);
    
    // Ensure ship2 was NOT hit
    expect(ship2.getHits()).toBe(0);
});

it.skip('should return "hit" when a ship is struck', () => {
    const testGameboard = gameboard();
    const ship = newShip(2);
    testGameboard.placeShip(ship, 0, 0, true);

    const result = testGameboard.receiveAttack(0, 0);
    
    expect(result).toBe('hit');
});