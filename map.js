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
        this.matrix = [];
        this.terrain_types = ["Grassland", "Forest", "River", "Ocean", "Desert", "Mountains", "City - center", "City - suburb", "City - sparse"];
        this.rows = rows;
        this.cols = cols;
        this.distrib = distributionArray || [1, 1, 1, 1, 1, 0.7]
        let matrixNew = [];
        for (let i = 0; i < this.rows; i++) {
            let thisRow = [];
            for (let j = 0; j < this.cols; j++) {
                thisRow.push(null);
            }
            this.matrix.push(thisRow);
            matrixNew.push(thisRow);
        }
        this.randomize();
        //takes randomized map and tries to put some sense into it
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let index = () => {
                    let surrounding = this.surrounding(i, j);
                    let output;
                    let probability = [0, 0, 0, 0, 0, 0];
                    for (let k = 0; k < surrounding.length; k++) {
                        let count = [0, 0, 0, 0, 0, 0]
                        switch (surrounding[k]) {
                            case "Grassland":
                                probability[0] += 30;
                                count[0]++;
                                break;
                            case "Forest":
                                probability[1] += 20;
                                count[1]++;
                                break;
                            case "River":
                                (k == 0 || k == 4) ? probability[2] += 40: null;
                                count[2]++;
                                break;
                            case "Ocean":
                            (count[3]>4) ? probability[2] += 50: null;
                                count[3]++;
                                break;
                            case "Desert":
                                probability[4] += 25;
                                count[4]++;
                                break;
                            case "Mountains":
                                (k == 0 || k == 4) ? probability[5] += 25: null;
                                count[5]++;
                                break;
                        }
                        // console.log(probability);
                    }
                    output = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 3), probability);
                    return output;
                };
                matrixNew[i][j] = this.terrain_types[index()];
            }
        }
        this.matrix = matrixNew;
    }
    draw(canvasContext) {
        let canvas = document.querySelector('canvas');
        (canvasContext == osDraw) ? canvas = document.getElementById('off-screen-canvas') : canvasContext = draw; // if no canvasContext is given, automatically draws on the visible canvas
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                switch (this.matrix[i][j]) {
                    case "Grassland":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Forest":
                        canvasContext.fillStyle = "rgb(0,100,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "River":
                        canvasContext.fillStyle = "rgb(0,0,200)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Ocean":
                        canvasContext.fillStyle = "rgb(0,0,100)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Desert":
                        canvasContext.fillStyle = "rgb(100,100,100)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "Mountains":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
                        break;
                    case "City - center":
                        canvasContext.fillStyle = "rgb(0,200,0)";
                        canvasContext.fillRect(i * canvas.width / this.rows, j * canvas.height / this.cols, canvas.width / this.rows, canvas.height / this.cols);
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
                let index = getRandomItem(this.terrain_types.slice(0, this.terrain_types.length - 3), this.distrib);
                this.matrix[i][j] = this.terrain_types[index];
            }
        }
    }
}