// Load User Data
$(document).ready(function(){
    $(".update_nick").text(localStorage.getItem("favoriteName"));


});

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext("2d");

// Create the unit
const box = 35;

// Load images

const ground = new Image();
ground.src = "assets/images/grounmapfinal.png";
// ground.src = "assets/images/snake_board.jpg";

const gameOver = new Image();
gameOver.src = "assets/images/gameoverImg.png";
// ground.src = "assets/images/snake_board.jpg";

const food_apple = new Image();
food_apple.src = "assets/images/apple.png";

const food_lemon = new Image();
food_lemon.src = "assets/images/Lemon.png";

const food_blueberry = new Image();
food_blueberry.src = "assets/images/Blueberry.png";


// load

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

//Import Username
let userName = (localStorage.getItem("favoriteName"));

// Create the food

let foodOne = {
    x : Math.floor(Math.random()*15+1) * box,
    y : Math.floor(Math.random()*12+3) * box,
};

let foodTwo = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box,
};

let foodThree = {
    x : Math.floor(Math.random()*13+1) * box,
    y : Math.floor(Math.random()*7+3) * box,
};

// Create the score var

let score = 0;
//Control the snake

let d;
document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT"
    }else if (event.keyCode == 38 && d != "DOWN"){
        d = "UP"

    }else if (event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT"

    }else if (event.keyCode == 40 && d != "UP"){
        d = "DOWN"
    }
}


$('#top').on({ 'touchstart' : function(){ d = "UP" } });
$('#left').on({ 'touchstart' : function(){ d = "LEFT" } });
$('#right').on({ 'touchstart' : function(){ d = "RIGHT" } });
$('#down').on({ 'touchstart' : function(){ d = "DOWN" } });


// Game Features
let a;
function doubleTail() {
    for (a = 0; a < 1; a ++) {
        snake.unshift(snake);
}}

function trippleTail() {
    for (a = 0; a < 2; a ++) {
        snake.unshift(snake);
}}






// Game Over function
function gameOverDraw() {
    ctx.drawImage(gameOver, 0, 0);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 13*box, 10*box);
    ctx.fillText(userName, 3.8*box, 10*box);
    gameOverDraw();
    // draw();


}

// Check Collision function
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything to canavas
function draw() {
    ctx.drawImage(ground, 0, 0);
    for(let i = 0; i < snake.length; i++ ){
        ctx.fillStyle = (i == 0)? "green" : "blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(food_apple, foodOne.x, foodOne.y);
    ctx.drawImage(food_lemon, foodTwo.x, foodTwo.y);
    ctx.drawImage(food_blueberry, foodThree.x, foodThree.y);
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // Which Direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;


    let a;
    // if the snake eats the food
    if(snakeX == foodOne.x && snakeY == foodOne.y){
        score++;
        foodOne = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 12 + 3) * box

        }} else if(snakeX == foodTwo.x && snakeY == foodTwo.y){
        score += 2;
        doubleTail();
        foodTwo = {
            x: Math.floor(Math.random()* 17 + 1) * box,
            y: Math.floor(Math.random()* 15 + 3) * box

        }}else if(snakeX == foodThree.x && snakeY == foodThree.y){
            score += 3;
            trippleTail();
            foodThree = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }


        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }


    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    // Game Over
    if(snakeX < box || snakeX > 17 * box || snakeY < box || snakeY > 17 * box || collision(newHead, snake)){
        ctx.fillstyle = "red";
        ctx.font = "65px Changa one";
        ctx.fillText("GAME OVER", 4*box, 9*box);
        clearInterval(game);
        gameOverDraw();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 9.2*box, 0.9*box);
}

// Call draw function every 100ms


let game = setInterval(draw,250);