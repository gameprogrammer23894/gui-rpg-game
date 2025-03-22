modules.generator = {
    // Method to get a random region from available regions in templates.regions
    getRandomRegion: function () {
        const regionKeys = Object.keys(templates.regions); // Get all region keys (e.g., 'town', 'forest', etc.)
        const randomRegionKey = regionKeys[Math.floor(Math.random() * regionKeys.length)]; // Pick a random key
        console.log(`Randomly selected region: ${randomRegionKey}`);
        return templates.regions[randomRegionKey]; // Return the randomly selected region
    },

    // Method to get a random coordinate that doesn't already exist
    getRandomCoordinate: function (existingCoords, mapSize) {
        let x, y;
        do {
            x = Math.floor(Math.random() * mapSize);
            y = Math.floor(Math.random() * mapSize);
        } while (existingCoords.has(`${x}, ${y}`)); // Ensure unique coordinates

        existingCoords.add(`${x}, ${y}`);
        return { x, y };
    },

    // Method to get a random place from the selected region
    getRandomPlace: function (selectedRegion) {
        const regionPlaces = Object.values(selectedRegion).filter(place => place.id); // Get only place objects
        if (!regionPlaces.length) return null;

        // Separate limited and unlimited places
        let limitedPlaces = regionPlaces.filter(place => {
            const count = place.limit || 0;
            return place.limit > 0 && count < place.limit;
        });

        let unlimitedPlaces = regionPlaces.filter(place => {
            const count = place.limit || 0;
            return place.limit === 0 || count < place.limit;
        });

        let allPlaces = [...limitedPlaces, ...unlimitedPlaces];
        if (allPlaces.length === 0) return null;

        return allPlaces[Math.floor(Math.random() * allPlaces.length)];
    },

    // Method to create places and store them in the world object
    createPlaces: function () {
        const mapSize = modules.mapManager.mapSize;
        const selectedRegion = modules.generator.getRandomRegion();
        const placeCount = new Map();
        const existingCoords = new Set();
        selectedRegion.places = {}; // Reset the places in the region

        let allPlaces = [];

        // Step 1: Place all limited places first
        let limitedPlaces = Object.values(selectedRegion).filter(place => place.id && place.limit > 0);
        for (let placeData of limitedPlaces) {
            for (let i = 0; i < placeData.limit; i++) {
                const { x, y } = modules.generator.getRandomCoordinate(existingCoords, mapSize);
                allPlaces.push(new Place({
                    id: `${placeData.id}${i + 1}`,
                    name: placeData.name,
                    x: x,
                    y: y,
                    description: placeData.description,
                    bgColor: placeData.bgColor,
                    textColor: placeData.textColor,
                    limit: placeData.limit
                }));
            }
        }

        // Step 2: Fill remaining slots with unlimited places
        let unlimitedPlaces = Object.values(selectedRegion).filter(place => place.id && place.limit === 0);
        let remainingSlots = 10 - allPlaces.length; // Ensure we don't exceed the limit

        for (let i = 0; i < remainingSlots; i++) {
            if (unlimitedPlaces.length === 0) break;
            const placeData = unlimitedPlaces[Math.floor(Math.random() * unlimitedPlaces.length)];

            const { x, y } = modules.generator.getRandomCoordinate(existingCoords, mapSize);
            allPlaces.push(new Place({
                id: `${placeData.id}${i + 1}`,
                name: placeData.name,
                x: x,
                y: y,
                description: placeData.description,
                bgColor: placeData.bgColor,
                textColor: placeData.textColor,
                limit: placeData.limit
            }));
        }

        // Set the first place as visible, others remain hidden
        if (allPlaces.length > 0) {
            allPlaces[0].visible = true;
        }

        // Store all places in the selected region
        allPlaces.forEach(place => {
            selectedRegion.places[place.id] = place;
        });

        modules.game.currentRegion = selectedRegion;
        modules.mapManager.renderMap();
    }
};
