import { Player } from "../modules/player";
import { newShip } from "../modules/ship.js";
import { controller } from "../modules/controller";

it('should start with Player 1 as the active player', () => {
    const player1 = Player('Human', 'human');
    const player2 = Player('Computer', 'computer');
    const game = controller(player1, player2);

    expect(game.getActivePlayer().getName()).toBe('Human');
});

it('should attack the right board and spot', () => {
    const p1 = Player('Leo', 'human');
    const p2 = Player('Computer', 'computer');
    const game = controller(p1, p2);

    expect(game.getMisses(p1)).toEqual([]);
});

it('should detect misses right', () => {
    const p1 = Player('Leo', 'human');
    const p2 = Player('Computer', 'computer');
    const game = controller(p1, p2);

    game.playRound([0, 0]);
    game.playRound([0,0]);

    expect(game.playRound([0, 0])).toEqual(false);
});

it('should not need coords if its robot turn', () => {
    const p1 = Player('Leo', 'human');
    const p2 = Player('Computer', 'computer');
    const game = controller(p1, p2);

    game.playRound([0, 0]);
    game.playRound([0, 0]);
});