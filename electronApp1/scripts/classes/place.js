class Place {
    constructor({ id, name, x, y, description, bgColor, textColor, limit = 0 }) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.description = description;
        this.bgColor = bgColor;  // Background color
        this.textColor = textColor; // Text color
        this.limit = limit;
        this.visible = false;
    }
}

class Region {
    constructor({ name, description, places }) {
        this.name = name;
        this.description = description;
        this.places = places; // Places will be directly provided as new Place objects
    }
}