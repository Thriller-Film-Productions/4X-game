class Building {
    constructor(row, col, type, mapper) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.map = mapper;
        switch (this.type) {
            case "Solar":
                this.map.buildings[row][col] = "Solar";
                break;
            case "Farm":
                this.map.buildings[row][col] = "Farm";
                break;
            case "Metal Extractor":
                this.map.buildings[row][col] = "Metal Extractor";
                break;
            case "Port":
                this.map.buildings[row][col] = "Port";
                break;
            case "Armory":
                this.map.buildings[row][col] = "Armory";
                break;
            case "Air Port":
                this.map.buildings[row][col] = "Air Port";
                break;
            case "Bridge":
                this.map.buildings[row][col] = "Bridge";
                break;
            case "Road":
                this.map.buildings[row][col] = "Road";
                break;
        }
    }
    draw() {
        switch (this.type) {
            case "Solar":
                mixed3dDraw.translate(((this.row) * 8000 / this.map.rows) - ((3 * 8000) / (this.map.rows * 4)), ((this.col) * 8000 / this.map.cols) + (8000 / (this.map.cols * 4)));
                mixed3dDraw.rotate(-Math.PI / 4);
                mixed3dDraw.transform(1.3, 0, 0, 1.3, 0, 0);
                mixed3dDraw.drawImage(assets.find((element) => element.name === "Solar_panel").img, 0, 0, 8000 / this.map.rows, 8000 / this.map.cols);
                mixed3dDraw.setTransform(1, 0, 0, 1, 0, 0);
                break;
            case "Farm":
                break;
            case "Metal Extractor":
                break;
            case "Port":
                break;
            case "Armory":
                break;
            case "Bridge":
                break;
            case "Road":
                break;
        }
    }
}