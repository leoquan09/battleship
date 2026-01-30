import { newShip } from '../modules/ship.js';
import { gameboard } from '../modules/gameboard.js';

it('is able to place ship in the right spot', () => {
    const myShip = newShip(2);
    const testGameBoard = gameboard();

    testGameBoard.placeShip(myShip, 2, 2, true);
    
    let location = testGameBoard.getShipLocation(myShip);

    expect(location).toEqual([[2, 2], [2, 3]]);
});

it('can recive attacks', () => {
    const myShip = newShip(2);
    const testGameBoard = gameboard();

    testGameBoard.placeShip(myShip, 2, 2, true);

    expect(testGameBoard.receiveAttack(2, 2)).toBe('hit'); 
    expect(testGameBoard.receiveAttack(2, 3)).toBe('hit');
});

it('records missed shots correctly', () => {
    const testGameboard = gameboard();

    const attackResult = testGameboard.receiveAttack(5, 5);

    expect(attackResult).toBe('miss');

    expect(testGameboard.getMisses()).toContainEqual([5, 5]);
});

it('should not allow ships to overlap', () => {
    const testGameboard = gameboard();
    const ship1 = newShip(3);
    const ship2 = newShip(3);

    testGameboard.placeShip(ship1, 0, 0, true);

    const isPlacementSuccessful = testGameboard.placeShip(ship2, 1, 0, false);

    expect(isPlacementSuccessful).toBe(false);
});

it('should not allow ships to be placed out of bounds', () => {
    const testGameboard = gameboard();
    const longShip = newShip(5);

    const isPlacementSuccessful = testGameboard.placeShip(longShip, 7, 0, true);

    expect(isPlacementSuccessful).toBe(false);
});

it('reports when all ships have been sunk', () => {
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