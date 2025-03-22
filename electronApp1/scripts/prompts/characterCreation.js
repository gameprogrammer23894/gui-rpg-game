prompts.characterCreation = {
    // Define dialogue objects with parameters to be passed dynamically
    dialogues: {
        gender: {
            id: "gender",
            text: "Welcome to the character creation screen! Let's get started. First, choose your gender.",
            options: [
                {
                    id: "male",
                    text: "Male",
                    data: "male"
                },
                {
                    id: "female",
                    text: "Female",
                    data: "female"
                }
            ],
            func: (data) => {
                prompts.characterCreation.setGender(data);
            }
        },
        race: {
            id: "race",
            text: "Now, choose your race.",
            options: [
                { id: "human", text: "Human", data: "human" },
                { id: "elf", text: "Elf", data: "elf" },
                { id: "dwarf", text: "Dwarf", data: "dwarf" },
                { id: "orc", text: "Orc", data: "orc" }
            ],
            func: (data) => {
                prompts.characterCreation.setRace(data);
            }
        },
        kit: {
            id: "kit",
            text: "Finally, choose your kit.",
            options: [
                { id: "fighter", text: "Fighter", data: "fighter" },
                { id: "knight", text: "Knight", data: "knight" },
                { id: "barbarian", text: "Barbarian", data: "barbarian" },
                { id: "paladin", text: "Paladin", data: "paladin" },
                { id: "ranger", text: "Ranger", data: "ranger" },
                { id: "gladiator", text: "Gladiator", data: "gladiator" },
                { id: "brawler", text: "Brawler", data: "brawler" },
                { id: "soldier", text: "Soldier", data: "soldier" },
                { id: "blackguard", text: "Blackguard", data: "blackguard" },

                // Magic Kits
                { id: "mage", text: "Mage", data: "mage" },
                { id: "druid", text: "Druid", data: "druid" },
                { id: "shaman", text: "Shaman", data: "shaman" },
                { id: "sorcerer", text: "Sorcerer", data: "sorcerer" },
                { id: "wizard", text: "Wizard", data: "wizard" },
                { id: "enchanter", text: "Enchanter", data: "enchanter" },
                { id: "necromancer", text: "Necromancer", data: "necromancer" },
                { id: "warlock", text: "Warlock", data: "warlock" },

                // Faith Kits
                { id: "priest", text: "Priest", data: "priest" },
                { id: "witchHunter", text: "Witch Hunter", data: "witchHunter" },
                { id: "healer", text: "Healer", data: "healer" },
                { id: "monk", text: "Monk", data: "monk" },

                // Rogue Kits
                { id: "rogue", text: "Rogue", data: "rogue" },
                { id: "thief", text: "Thief", data: "thief" },
                { id: "assassin", text: "Assassin", data: "assassin" },
                { id: "bountyHunter", text: "Bounty Hunter", data: "bountyHunter" },
                { id: "bard", text: "Bard", data: "bard" },

                // Common Kits
                { id: "peasant", text: "Peasant", data: "peasant" },
                { id: "farmer", text: "Farmer", data: "farmer" },
                { id: "merchant", text: "Merchant", data: "merchant" },
                { id: "artisan", text: "Artisan", data: "artisan" },
                { id: "cook", text: "Cook", data: "cook" },
                { id: "blacksmith", text: "Blacksmith", data: "blacksmith" },
                { id: "scholar", text: "Scholar", data: "scholar" },
                { id: "noble", text: "Noble", data: "noble" },
                { id: "engineer", text: "Engineer", data: "engineer" },
                { id: "mason", text: "Mason", data: "mason" },

                // Gatherer Kits
                { id: "miner", text: "Miner", data: "miner" },
                { id: "lumberjack", text: "Lumberjack", data: "lumberjack" },
                { id: "fisherman", text: "Fisherman", data: "fisherman" },
                { id: "herbalist", text: "Herbalist", data: "herbalist" },

                // Explorer Kits
                { id: "treasureHunter", text: "Treasure Hunter", data: "treasureHunter" },
                { id: "scout", text: "Scout", data: "scout" },
                { id: "explorer", text: "Explorer", data: "explorer" },
                { id: "beastMaster", text: "Beast Master", data: "beastMaster" },
                { id: "pirate", text: "Pirate", data: "pirate" },
                { id: "adventurer", text: "Adventurer", data: "adventurer" },
                { id: "mercenary", text: "Mercenary", data: "mercenary" }
            ],
            func: (data) => {
                prompts.characterCreation.setKit(data);
            }
        }
    },

    setGender(gender) {
        modules.game.character.gender = gender;
    },

    setRace(race) {
        modules.game.character.race = race;
    },

    // Now, setKit will both set the kit and show the character summary
    setKit(kit) {
        modules.game.character.kit = kit;
        this.showCharacterSummary(); // Show the summary right after setting the kit
    },

    showCharacterSummary() {
        const characterSummary = `You are ${modules.game.character.gender}, ${modules.game.character.race}, ${modules.game.character.kit}. Do you confirm?`;
        modules.popupManager.showConfirm(characterSummary,
            () => this.confirmCharacter(),
            () => this.resetCharacter()
        );
    },

    confirmCharacter() {
        // Assign the first place from the currentRegion to the character's atPlace
        const firstPlace = Object.values(modules.game.currentRegion.places)[0]; // Get the first place
        if (firstPlace) {
            modules.game.character.atPlace = firstPlace.id; // Assign the first place's ID to the character's atPlace
        }

        modules.popupManager.showNotice("Character confirmed! Enjoy your adventure!", () => {
            modules.generator.createPlaces(); // Ensure places are created before moving forward
            document.getElementById("prompts-container").style.display = "none";
            document.getElementById("game-container").style.display = "flex";
        });
    },

    resetCharacter() {
        modules.game.character = new Character();
        modules.promptManager.start(prompts.characterCreation.dialogues);
    }
};
