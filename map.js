let drawLoopy = true;

let rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
let getRandomItem = function (list, weight) {
    let total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });

    let random_num = rand(0, total_weight);
    let weight_sum = 0;
    //console.log(random_num)

    for (let i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return i;
        }
    }
};

class Mapper {
    constructor(rows, cols, distributionArray) {
        this.rivers = [];
        this.cities = [];
        this.matrix = [];
        this.terrain_types = ["Grassland", "Forest", "Ocean", "Desert", "Mountains", "River", "City - center", "City - suburb", "City - sparse"];
        this.rows = rows;
        this.cols = cols;
        this.distrib = distributionArray || [1, 1, 1, 1, 1];
        let matrixNew = [];
        for (let i = 0; i < this.rows; i++) {
            let thisRow = [];
            for (let j = 0; j < this.cols; j++) {
                thisRow.push(null);
            }
            this.matrix.push(thisRow);
            matrixNew.push(thisRow);
            this.cities.push(thisRow);
            this.rivers.push(thisRow);
        }
        this.randomize();
        //takes randomized map and tries to put some sense into it
        for (let sigh = 0; sigh < 5; sigh++) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    let index = () => {
                        let surrounding = this.surrounding(i, j);
                        let output;
                        let riverProb = 0;
                        let probability = [0, 0, 0, 0, 0];
                        let count = [0, 0, 0, 0, 0];
                        for (let k = 0; k < surrounding.length; k++) {
                            switch (surrounding[k]) {
                                case "Grassland":
                                    probability[0] += 35;
                                    count[0] += 1;
                                    break;
                                case "Forest":
                                    (count[1] > 2) ? probability[1] += 80: probability[1] += 25;
                                    count[1] += 1;
                                    break;
                                case "Ocean":
                                    (count[2] > 2) ? probability[2] += 600: probability[2] += 10;
                                    count[2] += 1;
                                    break;
                                case "Desert":
                                    (count[3] > 4) ? probability[3] += 500: null;
                                    (count[3] > 3) ? probability[3] += 500: null;
                                    (count[3] > 1) ? probability[3] += 70: probability[3] += 20;
                                    count[3] += 1;
                                    break;
                                case "Mountains":
                                    (k == 0 || k == 4) ? probability[4] += 100: null;
                                    count[4] += 1;
                                    break;
                            }
                            // console.log(probability);
                        }
                        output = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 4), probability);
                        return output;
                    };
                    matrixNew[i][j] = this.terrain_types[index()];
                }
            }
            this.matrix = matrixNew;
        }
    }
    draw(canvasContext) {
        let canvas = document.querySelector('canvas');
        if (canvasContext == osDraw) {
            canvas = document.getElementById('off-screen-canvas')
        } else if (canvasContext == osDraw2) {
            canvas = document.getElementById('off-screen-canvas-2');
        } else {
            canvasContext = draw;
        } // if no canvasContext is given, automatically draws on the visible canvas
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                switch (this.matrix[i][j]) {
                    case "Grassland":
                        canvasContext.drawImage(assets.find((element) => element.name === "Grassland").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Forest":
                        canvasContext.drawImage(assets.find((element)=>element.name === "Forest").img,i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Ocean":
                        canvasContext.drawImage(assets.find((element) => element.name === "Ocean").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Desert":
                        canvasContext.drawImage(assets.find((element) => element.name === "Desert").img, i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Mountains":
                        canvasContext.fillStyle = "rgb(200,200,200)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
                switch (this.rivers[i][j]) {
                    case "River":
                        canvasContext.fillStyle = "rgb(0,0,200)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
                switch (this.cities[i][j]) {
                    case "City - center":
                        canvasContext.drawImage(assets.find((element)=>element.name === "Test_image1").img,i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "City - suburb":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "City - sparse":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                }
            }
        }
    }
    // checks the surrounding hexes of a point and returns an array
    surrounding(row, col) {
        // pushes in a clockwise order
        let output = [];
        try {
            output.push(this.matrix[row - 1][col])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row - 1][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col + 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row + 1][col - 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row][col - 1])
        } catch (err) {
            output.push(null);
        }
        try {
            output.push(this.matrix[row - 1][col - 1])
        } catch (err) {
            output.push(null);
        }
        return output;
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let index = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 4), this.distrib);
                this.matrix[i][j] = this.terrain_types[index];
            }
        }
    }
    setCity(row, col, tier) {
        this.cities[row][col] = this.terrain_types.slice(6, 9)[tier - 1];
    }
}