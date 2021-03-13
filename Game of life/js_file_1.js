let canvas = document.getElementById("canvas");

let scale = 12;
let w_scaleMultiplier = 80;
let h_scaleMultiplier = 64;


canvas.width = scale * w_scaleMultiplier;
canvas.height = scale * h_scaleMultiplier;

cw = canvas.width;
ch = canvas.height;

let c = canvas.getContext("2d");



let unitMargins = {
    x_dimension: 0.5,
    y_dimension: 0.5
}

let unit = {
    x_dimension: scale - 2 * unitMargins.x_dimension,
    y_dimension: scale - 2 * unitMargins.y_dimension,
}

let createGrid = function () {
    let stopCondition = cw / scale;
    for (let i = 0; i < stopCondition; i++) {

        c.strokeStyle = "white";

        for (let k = 0; k < unitMargins.x_dimension; k++) {
            c.beginPath();
            c.moveTo(scale * i + k, 0);
            c.lineTo(scale * i + k, ch);
            c.stroke();
        }
        for (let k = 0; k < unitMargins.x_dimension; k++) {
            c.beginPath();
            c.moveTo(scale * (i + 1) - k, 0);
            c.lineTo(scale * (i + 1) - k, ch);
            c.stroke();
        }
    }

    stopCondition = ch / scale;
    for (let i = 0; i < stopCondition; i++) {

        c.strokeStyle = "white";

        for (let k = 0; k < unitMargins.y_dimension; k++) {
            c.beginPath();
            c.moveTo(0, scale * i + k);
            c.lineTo(cw, scale * i + k);
            c.stroke();

        }
        for (let k = 0; k < unitMargins.x_dimension; k++) {
            c.beginPath();
            c.moveTo(0, scale * (i + 1) - k);
            c.lineTo(cw, scale * (i + 1) - k);
            c.stroke();

        }
    }

}

createGrid();


let lifeArray = [];
let LifeCopy = []

for (let i = 0; i < cw / scale; i++) {
    lifeArray[i] = [];

    for (let j = 0; j < ch / scale; j++) {
        lifeArray[i][j] = false;

    }
}


[
    // Gosper glider gun
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],


    
    
    [60, 47], [61, 47], [62, 47],
    [60, 48], [61, 48], [62, 48],
    [60, 49], [61, 49], [62, 49],
    [60, 51], [61, 51], [62, 51],

    
]
    .forEach(function (point) {
        lifeArray[point[0]][point[1]] = true;
    });

let x;



let tick = function () {
    x = 0;
    for (let i = 1; i < cw / scale - 1; i++) {
        for (let j = 1; j < ch / scale - 1; j++) {

            let aliveNeighbours = 0;

            if (lifeArray[i][j] || !lifeArray[i][j]) {

                for (let m = 0; m < 3; m++) {
                    if (lifeArray[i - 1][j - 1 + m]) {
                        aliveNeighbours++;
                    }
                }

                for (let m = 0; m < 2; m++) {
                    if (lifeArray[i + m][j + 1]) {
                        aliveNeighbours++;
                    }
                }

                for (let m = 0; m < 2; m++) {
                    if (lifeArray[i + 1][j - 1 + m]) {
                        aliveNeighbours++;
                    }
                }

                for (let m = 0; m < 1; m++) {
                    if (lifeArray[i + m][j - 1]) {
                        aliveNeighbours++;
                    }
                }


            }









            if (lifeArray[i][j] === true) {
                if (aliveNeighbours < 2) {
                    LifeCopy[x] = {
                        xindice: i,
                        yindice: j
                    };
                    x++;
                }
                else if (aliveNeighbours > 3) {
                    LifeCopy[x] = {
                        xindice: i,
                        yindice: j
                    };
                    x++;
                }
            }
            else {
                if (aliveNeighbours == 3) {
                    LifeCopy[x] = {
                        xindice: i,
                        yindice: j
                    };
                    x++;
                }
            }
        }

    }


    for (let i = 0; i < x; i++) {
        lifeArray[LifeCopy[i].xindice][LifeCopy[i].yindice] = !lifeArray[LifeCopy[i].xindice][LifeCopy[i].yindice];
    }


}
tick();



function animate() {
    c.clearRect(0, 0, cw, ch);
    createGrid();
    for (let i = 0; i < cw / scale; i++) {
        for (let j = 0; j < ch / scale; j++)
            if (lifeArray[i][j] == true) {


                c.fillRect(i * scale + unitMargins.x_dimension, j * scale + unitMargins.y_dimension, unit.x_dimension, unit.y_dimension);
            }
    }
    tick();
}

setInterval(animate,70);





