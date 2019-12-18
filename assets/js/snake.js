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

const foodImg = new Image();
// foodImg.src = "assets/images/AppleTest.png";
foodImg.src = "assets/images/Apple.png";

const GreenfoodImg = new Image();
// foodImg.src = "assets/images/AppleTest.png";
GreenfoodImg.src = "assets/images/grapes.png";


// load

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Create the food

let foodOne = {
    x : Math.floor(Math.random()*12+1) * box,
    y : Math.floor(Math.random()*4+3) * box,
};

let foodTwo = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box,
};

// Create the score var

let score = [];
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

// Game Over function
function gameOverDraw() {
    ctx.drawImage(gameOver, 0, 0);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 13*box, 10*box);
    gameOverDraw()

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

    ctx.drawImage(foodImg, foodOne.x, foodOne.y);
    ctx.drawImage(GreenfoodImg, foodTwo.x, foodTwo.y);
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // Which Direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;



    // if the snake eats the food
    if(snakeX == foodOne.x && snakeY == foodOne.y){
        score++;
        foodOne = {
            x: Math.floor(Math.random() * 12 + 1) * box,
            y: Math.floor(Math.random() * 8 + 3) * box

        }} else if(snakeX == foodTwo.x && snakeY == foodTwo.y){
        score++;
        foodTwo = {
            x: Math.floor(Math.random() * 9 + 1) * box,
            y: Math.floor(Math.random() * 5 + 3) * box

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


let game = setInterval(draw,150);