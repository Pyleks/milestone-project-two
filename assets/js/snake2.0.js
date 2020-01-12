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
let index = 0;


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

// Synchronous XMLHttpRequest Warning cause an issue solved with below code A.A
// $("#hard_refresh").click(function() {
//     setTimeout(reload_window, 500)
// });
//
// // Synchronous XMLHttpRequest Warning cause an issue solved with below code A.A
// $("#home").click(function() {
//     setTimeout(reload_window, 500)
// });
// To reload window to allow traveling from game to home/feedback A.A
function reload_window(){
    window.location.reload();
}

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

let greenApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};


// Different apples provides different length A.A
let i;
function blueappleScore() {
    for (i = 0; i < 2; i++) {
        snake.maxCells++;
    }
    let random_number = (getRandomInt(0, 1));
    if (random_number == 1) {
        console.log(random_number)
    }
}

function yellowappleScore() {
    for (i = 0; i < 5; i++) {
        snake.maxCells++;
    }
}

// Game Over - Add Score A.A
function addScore() {
    usernameArray.push([(localStorage.getItem("favoriteName"))]);
    scoreArray.push(score);
    console.log(usernameArray[usernameArray.length -1]);
    let last_score = scoreArray[scoreArray.length - 1];
    let lastNick = usernameArray[usernameArray.length -1];

    for(index = 0; index < usernameArray.length; index++) {
        console.log(usernameArray[index])
    }
    for(i = 0; i < scoreArray.length; i++) {
        console.log(scoreArray[i]);

    }

    $(".final_nick_style").append("<br>" + `<p>${lastNick}</p>`);
    $(".final_score_style").append("<br>" + `<p>${last_score}</p>`);

}


// Game loop
function loop() {
    requestAnimationFrame(loop);
    // Determines the game speed
    if (++count < 5) {
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
            score ++;
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

// Listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
// Prevent snake from backtracking on itself by checking that it's
// Not already moving on the same axis (pressing left while moving
// Left won't do anything, and pressing right while moving left
// Shouldn't let you collide with your own body)

    // Left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // Up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // Right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // Down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }

});

// Mobile controls A.A
$('#top').on({ 'touchstart' : function(){ snake.dy = -grid; snake.dx = 0; $(this).addClass("yellow_bg") } });
$('#top').on({ 'touchend' : function(){  $(this).removeClass("yellow_bg") } });

$('#left').on({ 'touchstart' : function(){ snake.dx = -grid; snake.dy = 0; $(this).addClass("yellow_bg") } });
$('#left').on({ 'touchend' : function(){  $(this).removeClass("yellow_bg") } });

$('#right').on({ 'touchstart' : function(){ snake.dx = grid; snake.dy = 0; $(this).addClass("yellow_bg") } });
$('#right').on({ 'touchend' : function(){  $(this).removeClass("yellow_bg") } });

$('#down').on({ 'touchstart' : function(){ snake.dy = grid; snake.dx = 0; $(this).addClass("yellow_bg") } });
$('#down').on({ 'touchend' : function(){  $(this).removeClass("yellow_bg") } });


// start the game
requestAnimationFrame(loop);