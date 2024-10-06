const scoreBorder = document.getElementById('score-border');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = '';
let gameInterval;
let gameSppedDelay = 200;
let gameStarting;

function graw() {
    scoreBorder.innerHTML = '';
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake')
        setPosition(snakeElement, segment);
        scoreBorder.appendChild(snakeElement);
    })
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

graw();

function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    scoreBorder.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y }
}

function move() {
    const head = { ...snake(0)}
    switch (direction) {
        case 'up':
        head.y--;
        break;
        case 'down':
        head.y++;
        break;
        case 'left':
        head.x--;
        break;
        case 'right':
        head.x++;
        break;
    }
    
    snake.unshift(head);
    //snake.pop();
    
    if( head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval();
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSppedDelay);
    } else {
        snake.pop();
    }
}

// setInterval(() => {
    //     move();
//     draw();
// }, 200)

function startGame() {
    gameStarting = true;
    gameInterval = setInterval(() => {
        move();
        draw();
    }, gameSppedDelay)
}

function headKeyPress(event) {
    if((!gameStarting && event.code === 'space') ||
    (!gameStarting && event.code === ' ')) {
        startGame()
    } else {
        switch(event.key) {
            case 'ArrowUp':
            direction = 'up';
            break;
            case 'ArrowDown':
            direction = 'down';
            break;
            case 'ArrowLeft':
            direction = 'left';
            break;
            case 'ArrowRight':
            direction = 'right';
            break;
        }
    }
}

document.addEventListener('keydown', headKeyPress)

function increaseSpeed() {
    console.log(gameSppedDelay);
    if (gameSppedDelay > 150) {
        gameSppedDelay -= 5;
    } else if (gameSppedDelay > 100) {
        gameSppedDelay -= 3;
    }
}