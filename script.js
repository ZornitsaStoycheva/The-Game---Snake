const scoreBorder = document.getElementById('score-border');
const containerStart = document.getElementById('start');
const score = document.getElementById('score');
const highScoreContainer = document.getElementById('high-score');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSppedDelay = 200;
let gameStarting;

function graw() {
    scoreBorder.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
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

//graw();

function drawFood() {
    if(gameStarting) {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    scoreBorder.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y }
}

function move() {
    const head = { ...snake[0]}
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
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            console.log(gameSppedDelay)
            move();
            graw();
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
    containerStart.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        graw();
    }, gameSppedDelay)
}

function headKeyPress(event) {
    if((!gameStarting && event.code === 'Space') ||
    (!gameStarting && event.key === ' ')) {
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
    } else if (gameSppedDelay > 50) {
        gameSppedDelay -= 2;
    } else if (gameSppedDelay > 25) {
        gameSppedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for(let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x:10, y: 10 }];
    food = generateFood();
    direction = 'right';
    gameSppedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0')
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarting = false;
    containerStart.style.display = 'block';
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if(currentScore > highScore) {
        highScore = currentScore; 
        highScoreContainer.textContent = highScore.toString().padStart(3, '0')
    }
    highScoreContainer.style.display = 'block';
}