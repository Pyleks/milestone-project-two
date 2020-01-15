// Game Consist of Code acquired from another dev as well as my own.
// Comments market with A.A is developed by me.
// Core Code: https://gist.github.com/straker/ff00b4b49669ad3dec890306d348adc4

// Load User Data A.A
$(document).ready(function(){
    $(".update_nick").text(localStorage.getItem("favoriteName"));

});

// Global variables
let canvas = document.getElementById('snake_game');
let context = canvas.getContext('2d');
let grid = 32;
let count = 0;
// A.A
let score = 0;
let usernameArray = [];
let scoreArray =[];



// Imported Graphics A.A
const ground = new Image();
ground.src = "assets/images/theTree.png";


// Global Random Generator A.A
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enable continues playing A.A
$(".play_againButton").click(function() {
    $(".overlay").css("opacity", "0");
});


let snake = {
    x: 160,
    y: 160,

    // Moves 1 grid per frame
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // Beginner length of snake
    maxCells: 4
};
// Random Apple Placement at start of game A.A
let redApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};

let blueApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};

let yellowApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};



// Different apples provides different length A.A
let i;
function blueappleScore() {
    for (i = 0; i < 2; i++) {
        snake.maxCells++;
        score ++;

    }
}

function yellowappleScore() {
    for (i = 0; i < 5; i++) {
        snake.maxCells++;
        score ++;
    }
}

// Game Over - Add Score A.A
function addScore() {
    usernameArray.push([(localStorage.getItem("favoriteName"))]);
    scoreArray.push(score);
    let last_score = scoreArray[scoreArray.length - 1];
    let lastNick = usernameArray[usernameArray.length -1];


    $(".final_nick_style").append("<br>" + `<p>${lastNick}</p>`);
    $(".final_score_style").append("<br>" + `<p>${last_score}</p>`);

}


// Game loop
function loop() {
    requestAnimationFrame(loop);
    // Determines the game speed
    if (++count < 6) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Moves Snake
    snake.x += snake.dx;
    snake.y += snake.dy;
    context.drawImage(ground, 0, 0);

    // When snake moves across the border, it appears on the other side
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // Wrap snake position vertically on edge of screen
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Keep track of where snake has been. And the front of the array is always the head
    snake.cells.unshift({x: snake.x, y: snake.y});
    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw Red, A.A Blue and Yellow apple
    context.fillStyle = 'red';
    context.fillRect(redApple.x, redApple.y, grid - 1, grid - 1);

    context.fillStyle = 'blue';
    context.fillRect(blueApple.x, blueApple.y, grid - 1, grid - 1);

    context.fillStyle = 'yellow';
    context.fillRect(yellowApple.x, yellowApple.y, grid - 1, grid - 1);

    // Draw snake one cell at a time
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {

        // Drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // snake ate apple
        if (cell.x === redApple.x && cell.y === redApple.y) {
            snake.maxCells++;
            score ++;
            // Canvas is 800 x 800
            redApple.x = getRandomInt(0, 25) * grid;
            redApple.y = getRandomInt(0, 25) * grid;

            // Each block adds another apple to the Canvas A.A
        } else if (cell.x === blueApple.x && cell.y === blueApple.y) {
            blueappleScore();
            blueApple.x = getRandomInt(0, 25) * grid;
            blueApple.y = getRandomInt(0, 25) * grid;

            // Each block adds another apple to the Canvas A.A
        } else if (cell.x === yellowApple.x && cell.y === yellowApple.y) {
            yellowappleScore();
            score ++;
            yellowApple.x = getRandomInt(0, 25) * grid;
            yellowApple.y = getRandomInt(0, 25) * grid;
        }


        // Check collision with all cells after this one
        for (let i = index + 1; i < snake.cells.length; i++) {

            // Snake occupies same space as a body part. reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                // Red Apple
                redApple.x = getRandomInt(0, 25) * grid;
                redApple.y = getRandomInt(0, 25) * grid;
                // Blue Apple  A.A
                blueApple.x = getRandomInt(0, 25) * grid;
                blueApple.y = getRandomInt(0, 25) * grid;
                // Yellow Apple A.A
                yellowApple.x = getRandomInt(0, 25) * grid;
                yellowApple.y = getRandomInt(0, 25) * grid;
                // When Game Over. the Overlay is added A.A
                $(".overlay").css("opacity", "1");
                addScore();
                score = 0;
                return;


            }
        }
    });
    // Scoreboard A.A
    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 11.7 * grid, 1.1 * grid);
}

// A.A and Aaron Sinnott
// These functions used by both keyboard controls and touch-input
// Making the snake move correctly, and unable to move into it's own body by
// Clicking LEFT then RIGHT, or UP then DOWN.
// Shouldn't let you collide with your own body)
function moveUp(snake) {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
}

function moveLeft(snake) {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
}

function moveRight(snake) {
    if (snake.dx ===0 ) {
        snake.dx = grid;
        snake.dy = 0;
    }
}

function moveDown(snake) {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
}


// Listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {


    // Up arrow key
    if (e.which === 38) {
        moveUp(snake)
    }

    // Left arrow key
    else if (e.which === 37) {
        moveLeft(snake)
    }

    // Right arrow key
    else if (e.which === 39) {
        moveRight(snake)
    }
    // Down arrow key
    else if (e.which === 40) {
        moveDown(snake)
    }

});


// Mobile controls A.A & Aaron Sinnott
$('#top').on({ 'touchstart' : function(){
    moveUp(snake);
    $(this).addClass("yellow_bg")
}});
$('#top').on({ 'touchend' : function(){
    $(this).removeClass("yellow_bg")
}});


$('#left').on({ 'touchstart' : function(){
    moveLeft(snake);
    $(this).addClass("yellow_bg")
}});
$('#left').on({ 'touchend' : function(){
    $(this).removeClass("yellow_bg")
}});

$('#right').on({ 'touchstart' : function(){
    moveRight(snake);
    $(this).addClass("yellow_bg")
}});
$('#right').on({ 'touchend' : function(){
    $(this).removeClass("yellow_bg")
}});

$('#down').on({ 'touchstart' : function(){
    moveDown(snake);
    $(this).addClass("yellow_bg")
}});
$('#down').on({ 'touchend' : function(){
    $(this).removeClass("yellow_bg")
}});


// start the game
requestAnimationFrame(loop);