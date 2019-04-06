class Map {
    constructor(rows,cols) {
        this.matrix = [];
        this.terrain_types = ["Grassland","Forest","River","Ocean","Desert","City - center","City - suburb", "City - sparse"];
        this.rows = rows;
        this.cols = cols;
        //randomizes and creates map
        for (let i = 0; i<this.rows; i++) {
            let thisRow = [];
            for (let j = 0; j<this.cols; j++) {
                Math.floor(Math.random()*(this.terrain_types.length-3))
                let index = ()=>{
                    
                    return output
                }
                thisRow.push(this.terrain_types[index]); //selects a random terrain and
            }
            this.matrix.push(thisRow);
        }
    }
    draw() {
        for (let i = 0; i<this.rows; i++) {
            for (let j = 0; j<this.cols; j++) {
                
            }
        }
    }
}