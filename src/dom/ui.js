import '../styles.css';
import { Player } from "../modules/player";
import { newShip } from "../modules/ship.js";
import { controller } from "../modules/controller";

export const ui = () => {
    const humanBoard = document.querySelector('#human');
    const robotBoard = document.querySelector('#robot');

    
    const player1 = Player('Leo', 'human');
    const player2 = Player('Rob', 'computer');
    const game = controller(player1, player2);

    const init = () => {
        drawBoard(player1, humanBoard);
        drawBoard(player2, robotBoard);
        placeShips(player1);
        placeShips(player2);
    }

    const getBoardStatus = (player) => {
        return player.getBoard().getBoard();
    }

    const drawBoard = (player, board) => {
        board.innerHTML = '';
        const fragment = document.createDocumentFragment();

        getBoardStatus(player).forEach((row, y) => {

            row.forEach((spot, x) => {
                const cell = document.createElement('div');

                if (spot.attacked === 'hit') {
                    cell.className = 'cell hit';
                } else if (spot.attacked === 'miss') {
                    cell.className = 'cell miss';
                } else {
                    cell.className = 'cell spot';
                }
                fragment.appendChild(cell);

                let coords = [x, y];

                cell.addEventListener('click', () => {
                    game.playRound(coords);
                    drawBoard(player1, humanBoard);
                    drawBoard(player2, robotBoard);
                });
            });
        });

        board.appendChild(fragment);
    }

    const placeShips = (player) => {
        const carrier = newShip(4, 'carrier');
        const cruiser = newShip(3, 'cruiser');
        const steamBoat = newShip(2, 'steamboat');
        const miniShip = newShip(1, 'miniShip');
        player.getBoard().placeShip(carrier, 1, 1, true);
        player.getBoard().placeShip(cruiser, 3, 5, false);
        player.getBoard().placeShip(steamBoat, 3, 1, true);
        player.getBoard().placeShip(miniShip, 9, 9, true);

    }

    return { init };
}