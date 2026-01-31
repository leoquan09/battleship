export const gameboard = () => {
    const board = [...Array(10)].map(() => Array(10).fill(null));

    const placeShip = (ship, x, y, isVert) => {
        for (let i = 0; i < ship.length; i++) {
            if (isVert) {
                board[y + i][x] = ship;
            } else {
                board[y][x+ i] = ship;
            }
        }
    };

    const getShipLocation = (shipObject) => {
        const coords = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (board[y][x] === shipObject) {
                    coords.push({ x, y });
                }
            }
        }
        return coords;
    };


    const receiveAttack = (x, y) => {
        const target = board[y][x];
    
        if (target !== null) {
            target.hit();
            return board[y][x] = 'hit';
        }

        if (target === 'hit' || target === 'miss') {
            return 'already attacked';
        }

        return board[y][x] = 'miss'
    };

    const getMisses = (x, y) => {
        const coords = [];
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (board[y][x] === 'miss') {
                    coords.push({ x, y });
                }
            }
        }
        return coords;
    }

    return {
        placeShip,
        getShipLocation,
        receiveAttack,
        getMisses
    };
};