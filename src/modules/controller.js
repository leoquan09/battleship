export const controller = (p1, p2) => {
    const players = [p1, p2];
    let activePlayer = players[0];

    const changeTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
}