import '../styles.css';
import { Player } from "../modules/player";
import { newShip } from "../modules/ship.js";
import { controller } from "../modules/controller";

export const ui = () => {
    const humanBoard = document.querySelector('#human');
    const robotBoard = document.querySelector('#robot');

    const player1 = Player('Leo', 'human');
    const player2 = Player('Rob', 'computer');

    const init = () => {
        drawBoard(player1, humanBoard);
        drawBoard(player2, robotBoard);
    }

    const getBoardStatus = (player) => {
        return player.getBoard().getBoard();
    }

    const drawBoard = (player, board) => {
        board.innerHTML = '';
        const fragment = document.createDocumentFragment();

        getBoardStatus(player).forEach(row => {

            row.forEach(spot => {
                const cell = document.createElement('div');

                if (spot.attacked === 'hit') {
                    cell.className = 'cell hit';
                } else if (spot.attacked === 'miss') {
                    cell.className = 'cell miss';
                } else {
                    cell.className = 'cell spot';
                }
                fragment.appendChild(cell);
            });
        });

        board.appendChild(fragment);
    }

    return { init };
}