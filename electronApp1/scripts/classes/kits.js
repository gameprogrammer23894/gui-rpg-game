class CharacterKit {
    constructor({ startingWeapon, weaponBonus, startingHitPoints, startingSkills }) {
        this.startingWeapon = startingWeapon;
        this.weaponBonus = weaponBonus;
        this.startingHitPoints = startingHitPoints;
        this.startingSkills = startingSkills;
    }
}

class KnightKit extends CharacterKit {
    constructor() {
        super({
            startingWeapon: "Long Sword",
            weaponBonus: ["Two Handed Sword", "Polearm"],
            startingHitPoints: 12,
            startingSkills: [
                "Combat",
                "Shield",
                "Parrying",
                "Dueling",
                "Critical Strike"
            ]
        });
    }
}

class MageKit extends CharacterKit {
    constructor() {
        super({
            startingWeapon: "Hand",
            weaponBonus: ["Staff"],
            startingHitPoints: 6,
            startingSkills: [
                "Magic",
                "Arcane Magic",
                "Mana Control",
                "Spellcasting",
                "Alchemy"
            ]
        });
    }
}

class RogueKit extends CharacterKit {
    constructor() {
        super({
            startingWeapon: "Dagger",
            weaponBonus: ["Dagger", "Shortbow"],
            startingHitPoints: 8,
            startingSkills: [
                "Roguery",
                "Sneaking",
                "Pickpocketing",
                "Lockpicking",
                "Traps"
            ]
        });
    }
}