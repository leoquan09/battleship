export const controller = (p1, p2) => {
    const players = [p1, p2];
    let activePlayer = players[0];

    const changeTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getOpponent = () => {
        return activePlayer === players[0] ? players[1] : players[0];
    }

    const hasIt = (parentArray, coord) => {
        return parentArray.some(p => p.x === coord[0] && p.y === coord[1]);
    };

    const getActivePlayer = () => activePlayer;

    const makeMove = (coord) => {
        const [x, y] = coord;
        let opponent = getOpponent();
        
        if (hasIt(opponent.getBoard().getMisses(), coord)) {
            return false;
        };

        opponent.getBoard().receiveAttack(x, y);

        return true;
    }

    const getCompMove = () => {
        let opponent = getOpponent();

        return opponent.getRandomCoords(opponent.getBoard());
    }

    const playRound = (coord) => {
    const humanMove = makeMove(coord);
    if (!humanMove) return false; 

    changeTurn();

    if (activePlayer.getType() === 'computer') {
        const compCoord = getCompMove();
        makeMove(compCoord);
        changeTurn();
    }
    
    return true;
};

    const getMisses = (player) => {
        return player.getBoard().getMisses();
    }

    return { changeTurn, getActivePlayer, playRound, getMisses }
}