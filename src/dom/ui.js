import { Player } from "../modules/player";
import { newShip } from "../modules/ship.js";
import { controller } from "../modules/controller";

export const ui = () => {
    const humanBoard = document.querySelector('#human');
    const robotBoard = document.querySelector('#robot');

    const player1 = Player('Leo', 'human');
    const player2 = Player('Rob', 'computer');

    const init = () => {
        drawBoard(player1);
        drawBoard(player2);
    }

    const drawBoard = (board) => {
        board.getBoard().getBoard().forEach(element => {
            console.log(element);
        });
    }

    return { init };
}