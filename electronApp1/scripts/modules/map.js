modules.mapManager = {
    // Properties declared directly in the object
    mapSize: 5,
    transformX: 0,
    transformY: 0,
    baseMoveAmount: 70,
    moveAmount: 70,
    cellSize: 50,
    minCellSize: 50,
    maxCellSize: 100,
    gridGap: 50 / 2,  // Default gap based on cell size

    // Render map based on the current properties (cell size, grid gap, etc.)
    renderMap: function() {
        const mapGrid = document.getElementById('map-grid');
        if (!mapGrid) return;

        mapGrid.innerHTML = '';  // Clear previous grid content

        // Create a map of places that are visible
        const placeMap = new Map(
            Object.values(templates.regions.town.places)
                .filter(place => place.visible) // Only include places that are visible
                .map(place => [`${place.x}, ${place.y}`, place])
        );

        const newTextSize = this.cellSize / 6;  // Adjust text size based on cell size

        for (let y = 0; y < this.mapSize; y++) {
            for (let x = 0; x < this.mapSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('map-cell');

                const place = placeMap.get(`${x}, ${y}`);
                if (place) {
                    cell.setAttribute('data-id', place.id);
                    cell.setAttribute('data-name', place.name);
                    cell.innerHTML = place.name;

                    // Apply background and text color
                    cell.style.backgroundColor = place.bgColor || '#333'; // Default dark grey if undefined
                    cell.style.color = place.textColor || '#FFF'; // Default white text if undefined
                } else {
                    cell.setAttribute('data-id', 'none');
                    cell.setAttribute('data-name', 'None');
                    cell.style.backgroundColor = 'transparent';
                    cell.innerHTML = '';  // Empty cell
                }

                // Update cell size and font size
                cell.style.width = `${this.cellSize}px`;
                cell.style.height = `${this.cellSize}px`;
                cell.style.fontSize = `${newTextSize}px`;

                mapGrid.appendChild(cell);
            }
        }

        // Update grid gap between cells
        mapGrid.style.gridGap = `${this.gridGap}px`;
    }
};