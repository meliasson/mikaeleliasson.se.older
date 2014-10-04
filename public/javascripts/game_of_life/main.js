var gol = {};

/* controller */

gol.controller = {};

gol.controller.run = function() {
    gol.model.init();
    gol.view.init();
    gol.controller.step();
};

gol.controller.step = function() {
    var state = gol.model.update();
    gol.view.update(state);
    window.setTimeout(gol.controller.step, 2000);
};

/* view */

gol.view = {};

gol.view.init = function() {
    this._canvas = document.getElementById('canvas');
    this._canvas.width = this._compute_canvas_size();
    this._canvas.height = this._canvas.width;
    this._cellSize = this._canvas.width / 30;
    this._context = canvas.getContext("2d");
    this._context.fillStyle = "#0B486B"
    this._context.clearRect(0, 0, canvas.width, canvas.height);
};

gol.view.update = function(grid) {
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (!grid[row][col]) {
                this._context.clearRect(
                    col * this._cellSize,
                    row * this._cellSize,
                    this._cellSize,
                    this._cellSize);
            }
            else {
                this._context.fillRect(
                    col * this._cellSize,
                    row * this._cellSize,
                    this._cellSize,
                    this._cellSize);
            }
        }
    }
};

gol.view._compute_canvas_size = function() {
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    var size = Math.min(width, height);
    return size - (size % 30);
}

/* model */

var gol = gol || {};

gol.model = {};

gol.model.init = function() {
    this.population = [];
    for (var row = 0; row < 30; row++) {
        this.population.push([]);
        for (var col = 0; col < 30; col++) {
            if (Math.floor(Math.random() * 5) < 4) {
                this.population[row].push(0);
            }
            else {
                this.population[row].push(1);
            }
        }
    }
};

gol.model.update = function() {
    var nextGeneration = [];

    for (var row = 0; row < this.population.length; row++) {
        nextGeneration.push([]);
        for (var col = 0; col < this.population[row].length; col++) {
            var neighbors = this._getNeighborCount(row, col, this.population);

            if (this.population[row][col]) {
                if (neighbors < 2 || neighbors > 3) {
                    nextGeneration[row].push(0);
                }
                else if (neighbors == 2 || neighbors == 3) {
                    nextGeneration[row].push(1);
                }
            }
            else {
                if (neighbors == 3) {
                    nextGeneration[row].push(1);
                }
                else {
                    nextGeneration[row].push(0);
                }
            }
        }
    }

    this.population = nextGeneration;
    return this.population;
};

gol.model._getNeighborCount = function(row, column, matrix) {
    var maxRowIndex = matrix.length - 1;
    var maxColumnIndex = matrix[0].length - 1;
    var neighbors = [];

    // upper-left neighbor
    if (row > 0 && column > 0) {
        neighbors.push(matrix[row - 1][column - 1]);
    }

    // upper-middle neighbor
    if (row > 0) {
        neighbors.push(matrix[row - 1][column]);
    }

    // upper-right neighbor
    if (row > 0 && column < maxColumnIndex) {
        neighbors.push(matrix[row - 1][column + 1]);
    }

    // right neighbor
    if (column < maxColumnIndex) {
        neighbors.push(matrix[row][column + 1]);
    }

    // lower-right neighbor
    if (row < maxRowIndex && column < maxColumnIndex) {
        neighbors.push(matrix[row + 1][column + 1]);
    }

    // lower neighbor
    if (row < maxRowIndex) {
        neighbors.push(matrix[row + 1][column]);
    }

    // lower-left neighbor
    if (row < maxRowIndex && column > 0) {
        neighbors.push(matrix[row + 1][column - 1]);
    }

    // left neighbor
    if (column > 0) {
        neighbors.push(matrix[row][column - 1]);
    }

    var neighborCount = 0;
    for (var i = 0; i < neighbors.length; i++) {
        neighborCount += neighbors[i];
    }

    return neighborCount;
};
