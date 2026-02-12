import { Player } from '../modules/player.js';

test('Computer player picks a coordinate not already in allShots', () => {
  const computer = Player('AI', 'computer');
  
  const mockBoard = {
    getMisses: jest.fn().mockReturnValue([[0, 0], [0, 1], [0, 2]]),
    getHits: jest.fn().mockReturnValue([[1, 0]]),
    allShots: [[1, 2], [3, 4]],
    receiveAttack: jest.fn()
  };

  const move = computer.getRandomCoords(mockBoard);

  expect(mockBoard.allShots).not.toContainEqual(move);
});

test('Player factory correctly assigns types', () => {
  const human = Player('Leo', 'human');
  const computer = Player('SkyNet', 'computer');

  expect(human.getType()).toBe('human');
  expect(computer.getType()).toBe('computer');
});

test('Player object stores the name correctly', () => {
  const player = Player('Sarah');
  expect(player.getName()).toBe('Sarah');
});