export const gameboard = () => {
    const board = [...Array(10)].map(() => 
        Array(10).fill(null).map(() => ({ 
            ship: null, 
            attacked: null 
        }))
    );

    const getBoard = () => {
        return board;
    }

    const placeShip = (ship, x, y, isVert) => {
        for (let i = 0; i < ship.length; i++) {
            let checkX = isVert ? x : x + i;
            let checkY = isVert ? y + i : y;

            if (checkX < 0 || checkX >= 10 || checkY < 0 || checkY >= 10) {
                return false; 
            }

            if (board[checkY][checkX].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            let curX = isVert ? x : x + i;
            let curY = isVert ? y + i : y;

            board[curY][curX].ship = ship;
        }

        return true; 
    };

    const receiveAttack = (x, y) => {
        const cell = board[y][x];

        if (cell.attacked) return 'already attacked';

        if (cell.ship) {
            cell.ship.hit();
            return cell.attacked = 'hit';
        }

        return cell.attacked = 'miss';
    };

    const getMisses = () => {
        const misses = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const cell = board[y][x];
                if (cell.attacked !== null && cell.ship === null) {
                    misses.push({ x, y });
                }
            }
        }
        return misses;
    }

    const getHits = () => {
        const misses = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const cell = board[y][x];
                if (cell.attacked !== null && cell.ship !== null) {
                    misses.push({ x, y });
                }
            }
        }
        return misses;
    }

    const getShipLocation = (shipObject) => {
        const coords = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (board[y][x].ship === shipObject) {
                    coords.push({ x, y });
                }
            }
        }
        return coords;
    };

    const allShipsSunk = () => {
        return board.flat().every(cell => {
        if (!cell.ship) return true;
            return cell.attacked === 'hit'; 
        });
    }

    return { placeShip, receiveAttack, getShipLocation, getMisses, allShipsSunk, getHits, getBoard };
};