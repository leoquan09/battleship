export const gameboard = () => {
    let occupiedSpots = [];
    let missedAttacks = [];

    const placeShip = (ship, x, y, isVert) => {
        let coordinates = [];

        for (let i = 0; i < ship.length; i++) {
            if (isVert) {
                coordinates.push([x, y + i]);
            } else {
                coordinates.push([x + i, y]);
            }
        }

        const placement = {
            ship: ship,
            coordinates: coordinates
        };

        occupiedSpots.push(placement);
    };

    const getShipLocation = (shipObject) => {
        const placement = occupiedSpots.find(p => p.ship.name === shipObject.name);
        
        return placement ? placement.coordinates : [];
    };

    return {
        placeShip,
        getShipLocation
    };
};