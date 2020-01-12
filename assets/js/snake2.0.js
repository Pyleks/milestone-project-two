// Load User Data
$(document).ready(function(){
    $(".update_nick").text(localStorage.getItem("favoriteName"));

});

// Global variables
var canvas = document.getElementById('snake_game');
var context = canvas.getContext('2d');
var grid = 32;
var count = 0;
let score = 0;
let usernameArray = [];
let scoreArray =[];
let index = 0;
// player_information.push([(localStorage.getItem("favoriteName"))], []);



// Imported Graphics
const ground = new Image();
ground.src = "assets/images/theTree.png";


// Global Random Generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//
$(".play_againButton").click(function() {
    $(".overlay").css("opacity", "0");
});

$("#hard_refresh").click(function() {
    setTimeout(reload_window, 500)

});

function reload_window(){
    window.location.reload();
}

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
// Random Apple Placement
var redApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};

var blueApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};

var yellowApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};

var greenApple = {
    x : Math.floor(Math.random()*18+1) * grid,
    y : Math.floor(Math.random()*11+3) * grid
};


// Game Features
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

// Game Over - Add Score
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


// game loop
function loop() {
    requestAnimationFrame(loop);
    // slow game loop to 15 fps instead of 60 (60/15 = 4)
    if (++count < 5) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // move snake by it's velocity
    snake.x += snake.dx;
    snake.y += snake.dy;
    context.drawImage(ground, 0, 0);

    // wrap snake position horizontally on edge of screen
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    // wrap snake position vertically on edge of screen
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // keep track of where snake has been. front of the array is always the head
    snake.cells.unshift({x: snake.x, y: snake.y});
    // remove cells as we move away from them
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // draw Red, Blue and Yellow apple
    context.fillStyle = 'red';
    context.fillRect(redApple.x, redApple.y, grid - 1, grid - 1);

    context.fillStyle = 'blue';
    context.fillRect(blueApple.x, blueApple.y, grid - 1, grid - 1);

    context.fillStyle = 'yellow';
    context.fillRect(yellowApple.x, yellowApple.y, grid - 1, grid - 1);

    // draw snake one cell at a time
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {

        // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // snake ate apple
        if (cell.x === redApple.x && cell.y === redApple.y) {
            snake.maxCells++;
            score ++;
            // canvas is 400x400 which is 25x25 grids
            redApple.x = getRandomInt(0, 25) * grid;
            redApple.y = getRandomInt(0, 25) * grid;

        } else if (cell.x === blueApple.x && cell.y === blueApple.y) {
            blueappleScore();
            score ++;

            // canvas is 400x400 which is 25x25 grids
            blueApple.x = getRandomInt(0, 25) * grid;
            blueApple.y = getRandomInt(0, 25) * grid;
        } else if (cell.x === yellowApple.x && cell.y === yellowApple.y) {
            yellowappleScore();
            score ++;

            // canvas is 400x400 which is 25x25 grids
            yellowApple.x = getRandomInt(0, 25) * grid;
            yellowApple.y = getRandomInt(0, 25) * grid;
        }


        // check collision with all cells after this one (modified bubble sort)
        for (var i = index + 1; i < snake.cells.length; i++) {

            // snake occupies same space as a body part. reset game
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
                // Blue Apple
                blueApple.x = getRandomInt(0, 25) * grid;
                blueApple.y = getRandomInt(0, 25) * grid;
                // Yellow Apple
                yellowApple.x = getRandomInt(0, 25) * grid;
                yellowApple.y = getRandomInt(0, 25) * grid;
                $(".overlay").css("opacity", "1");
                addScore();
                score = 0;
                return;


            }
        }
    });
    context.fillStyle = "white";
    context.font = "45px Changa one";
    context.fillText(score, 11.7 * grid, 1.1 * grid);


}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
// prevent snake from backtracking on itself by checking that it's
// not already moving on the same axis (pressing left while moving
// left won't do anything, and pressing right while moving left
// shouldn't let you collide with your own body)

    // left arrow key
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }

});

// Mobile controls
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