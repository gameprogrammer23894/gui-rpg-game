modules.actionManager = {
    // Function to explore the current region with a chance to discover a new place
    explore: function () {
        if (modules.game.character.fatiguePoints <= 0) {
            modules.outputManager.updateLog("You are too exhausted to explore.");
            return;
        }

        // Get the current region dynamically
        const currentRegion = modules.game.currentRegion;
        if (!currentRegion || !currentRegion.places) {
            modules.outputManager.updateLog("There is nothing to explore here.");
            return;
        }

        const placesInRegion = currentRegion.places; // Get places in the current region

        // Check if all places are visible
        const allVisible = Object.values(placesInRegion).every(place => place.visible);
        if (allVisible) {
            modules.outputManager.updateLog("There is nothing left to explore in this region.");
            return;
        }

        // Reduce fatigue by 1 point
        modules.game.character.fatiguePoints = Math.max(0, modules.game.character.fatiguePoints - 1);

        // Update the UI to reflect the new fatigue level
        modules.uiManager.updateFatigueBar();

        // Filter out the undiscovered places
        const undiscoveredPlaces = Object.values(placesInRegion).filter(place => !place.visible);

        // 1 in 4 chance to discover a new place
        if (Math.random() <= 0.25 && undiscoveredPlaces.length > 0) {
            const newPlace = undiscoveredPlaces[Math.floor(Math.random() * undiscoveredPlaces.length)];
            newPlace.visible = true;
            modules.outputManager.updateLog(`You found ${newPlace.name}.`);
            modules.mapManager.renderMap();
        } else {
            modules.outputManager.updateLog("You explored but didn't find anything.");
        }
    },

    // Function to rest and restore 15% of the character's fatigue
    rest: function () {
        const character = modules.game.character;
        const maxFatiguePoints = character.maxFatiguePoints; // Assuming maxFatiguePoints exists

        // Check if already fully rested
        if (character.fatiguePoints >= maxFatiguePoints) {
            modules.outputManager.updateLog("You are already fully rested.");
            return;
        }

        // Calculate the amount of fatigue to restore (15% of maxFatiguePoints)
        let fatigueToRestore = Math.floor(maxFatiguePoints * 0.15);

        // If the calculated fatigue to restore is 0, we should restore at least 1 point
        if (fatigueToRestore === 0) {
            fatigueToRestore = 1;
        }

        // Restore fatigue without exceeding the max fatigue points
        character.fatiguePoints = Math.min(maxFatiguePoints, character.fatiguePoints + fatigueToRestore);

        // Update the UI to reflect the new fatigue level
        modules.uiManager.updateFatigueBar();

        // Log the restoration in the output
        modules.outputManager.updateLog(`You rested and restored ${fatigueToRestore} fatigue points.`);
    }
};
