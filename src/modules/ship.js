export const newShip = (len) => {
    const length = len;
    let hits = 0;

    const getLength = () => length;
    const hit = () => hits++;
    const getHits = () => hits;

    const isSunk = () => hits >= length;

    return {
        getLength,
        hit,
        isSunk,
        getHits
    }
}