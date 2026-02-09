import { Player } from "../modules/player";
import { controller } from "../modules/controller";

it('should start with Player 1 as the active player', () => {
    const player1 = Player('Human', 'human');
    const player2 = Player('Computer', 'computer');
    const game = controller(player1, player2);

    expect(game.getActivePlayer()).toBe(player1);
});

it('should switch the active player after a turn is played', () => {
    const player1 = Player('Human', 'human');
    const player2 = Player('Computer', 'computer');
    const game = controller(player1, player2);

    game.playRound([0, 0]); 

    expect(game.getActivePlayer()).toBe(player2);
});