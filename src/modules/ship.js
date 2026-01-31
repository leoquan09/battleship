export const newShip = (len, name) => {
    let hits = 0;

    return {
        name,
        length: len, 
        hit() { hits++; },
        getHits() { return hits; },
        isSunk() { return hits >= len; }
    };
};