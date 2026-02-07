export const Player = (name, type) => {

    const attack = (coords, board) => {
        const x = coords[0];
        const y = coords[1];
         return board.receiveAttack(x, y);
    }

    const getName = () => name;
    const getType = () => type;

    const getRandomCoords = (board) => {
        const misses = board.getMisses();
        const hits = board.getHits();
        const occupied = [...misses, ...hits];

        let x, y;
        let isOccupied = true;

        while (isOccupied) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);

            isOccupied = occupied.some(coord => coord[0] === x && coord[1] === y);
        }

        return [x, y];
    }

    return { attack, getRandomCoords, getName, getType }
}