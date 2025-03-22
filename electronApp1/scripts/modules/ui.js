modules.uiManager = {
    // Function to update the fatigue bar UI
    updateFatigueBar: function () {
        const maxFatigue = 5; // The maximum number of fatigue points the character can have
        const fatigueBar = document.getElementById("fatigue-bar");

        // Calculate the percentage of remaining fatigue
        const fatiguePercentage = (modules.game.character.fatiguePoints / maxFatigue) * 100;

        // Ensure the width of the bar is updated in percentage
        fatigueBar.style.width = `${fatiguePercentage}%`; // Adjust width dynamically in percentage
    }
};
