import { Player } from '../modules/player.js';

it('can attack an enemy board', () => {
    const player = Player('Leo');
    const fakeBoard = {
        receiveAttack: jest.fn()
    };

    player.attack([5, 2], fakeBoard);
    expect(fakeBoard.receiveAttack).toHaveBeenCalledWith(5, 2);
    expect(fakeBoard.receiveAttack).toHaveBeenCalledTimes(1);
});

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

test('Player receives the result of the attack from the board', () => {
  const player = Player('Leo');
  
  const mockBoard = {
    receiveAttack: jest.fn().mockReturnValue('hit')
  };

  const result = player.attack([1, 1], mockBoard);

  expect(result).toBe('hit');
});