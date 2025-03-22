modules.inputManager = {
    // Initialize key bindings for zoom, movement, and other interactions
    initializeKeyBindings: function () {
        document.addEventListener('keydown', (event) => {
            // Handle movement keys (Arrow keys)
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
                this.moveMap(event);
            }
            // Handle zoom in (either + or =)
            else if (event.key === "+" || event.key === "=") {
                this.zoom(1);
            }
            // Handle zoom out
            else if (event.key === "-") {
                this.zoom(-1);
            }
            // Handle 'Q' key for Explore
            else if (event.key.toLowerCase() === 'q') {
                document.getElementById('explore-button').click();
            }
            // Handle 'W' key for Rest
            else if (event.key.toLowerCase() === 'w') {
                document.getElementById('rest-button').click();
            }
        });

        // Event listener for clicking a cell to center the map on that cell
        document.getElementById('map-grid').addEventListener('click', (event) => {
            // Check if the Ctrl key is pressed along with the click
            if (event.ctrlKey && event.target && event.target.classList.contains('map-cell')) {
                this.centerOnCell(event.target);
            }
        });
    },

    // Method to move the map based on arrow key press
    moveMap: function (event) {
        const mapGrid = document.getElementById("map-grid");

        switch (event.key) {
            case "ArrowUp":
                modules.mapManager.transformY += modules.mapManager.moveAmount;
                break;
            case "ArrowDown":
                modules.mapManager.transformY -= modules.mapManager.moveAmount;
                break;
            case "ArrowLeft":
                modules.mapManager.transformX += modules.mapManager.moveAmount;
                break;
            case "ArrowRight":
                modules.mapManager.transformX -= modules.mapManager.moveAmount;
                break;
        }

        // Apply the updated transform position to the map grid
        mapGrid.style.transform = `translate(${modules.mapManager.transformX}px, ${modules.mapManager.transformY}px)`;

        event.preventDefault();  // Prevent page scrolling
    },

    // Method to zoom the map (zoom in or out)
    zoom: function (direction) {
        if (direction === 1 && modules.mapManager.cellSize < modules.mapManager.maxCellSize) {
            modules.mapManager.cellSize += 10;  // Increase size by 10px
        } else if (direction === -1 && modules.mapManager.cellSize > modules.mapManager.minCellSize) {
            modules.mapManager.cellSize -= 10;  // Decrease size by 10px
        }

        // Update grid gap and move amount based on zoom level
        modules.mapManager.gridGap = modules.mapManager.cellSize / 2;
        modules.mapManager.moveAmount = (modules.mapManager.cellSize / 100) * modules.mapManager.baseMoveAmount;

        modules.mapManager.renderMap();  // Re-render map after zooming
    },

    // Method to center the map on the clicked cell
    centerOnCell: function (cell) {
        const mapGrid = document.getElementById('map-grid');
        const cellRect = cell.getBoundingClientRect();
        const gridRect = mapGrid.getBoundingClientRect();

        // Calculate the position difference between grid and clicked cell
        const offsetX = cellRect.left - gridRect.left;
        const offsetY = cellRect.top - gridRect.top;

        // Calculate new position to center the cell within the grid
        const centerX = -(offsetX - mapGrid.offsetWidth / 2 + cellRect.width / 2);
        const centerY = -(offsetY - mapGrid.offsetHeight / 2 + cellRect.height / 2);

        // Update transform values to center the map
        modules.mapManager.transformX = centerX;
        modules.mapManager.transformY = centerY;

        mapGrid.style.transform = `translate(${modules.mapManager.transformX}px, ${modules.mapManager.transformY}px)`;
    }
};
