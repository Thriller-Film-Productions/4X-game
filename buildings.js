class Building {
    constructor(mapper) {
        this.mapper = mapper;
        this.rows = mapper.rows;
        this.cols = mapper.cols;
        this.matrix = generateMatrix(this.rows,this.cols);
    }
    build(row,col,type) {
        
        switch (type) {
            case "Solar":
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
    draw() {
        for (let i=0;i<this.rows;i++) {
                for (let j=0;j<this.cols;j++) {
                    switch (this.matrix[row][col]) {
                        case "Solar":
                        mixed3dDraw.fillRect(
                        (i * canvas.width / this.rows)+((canvas.width / this.rows)/2),
                        (j * canvas.height / this.cols)+((canvas.height / this.cols)/2),
                        100,
                        100);
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
        }
    }