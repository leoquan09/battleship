export const newShip = (len) => {
    const length = len;
    const hits = 0;

    const getLength = () => length;
    const hit = () => hits++;

    const isSunk = () => hits >= length;

    return {
        getLength,
        hit,
        isSunk
    }
}