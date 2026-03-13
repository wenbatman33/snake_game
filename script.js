const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const overlayText = document.getElementById('overlay-text');
const restartBtn = document.getElementById('restart-btn');

// Game constants
const GRID_SIZE = 20;
let TILE_COUNT;
let GAME_SPEED = 100;

// Game state
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoopIdentifier;
let isFirstMove = true;

// Initialize
function init() {
    highScoreElement.textContent = highScore.toString().padStart(3, '0');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    
    // Start button
    restartBtn.addEventListener('click', restartGame);
    
    // Initial draw
    draw();
}

function resizeCanvas() {
    const size = canvas.parentElement.clientWidth;
    canvas.width = size;
    canvas.height = size;
    TILE_COUNT = Math.floor(canvas.width / GRID_SIZE);
}

function handleKeyDown(e) {
    if (isFirstMove && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        startGame();
        isFirstMove = false;
    }

    const key = e.key.toLowerCase();
    
    if ((key === 'arrowup' || key === 'w') && dy === 0) {
        dx = 0; dy = -1;
    } else if ((key === 'arrowdown' || key === 's') && dy === 0) {
        dx = 0; dy = 1;
    } else if ((key === 'arrowleft' || key === 'a') && dx === 0) {
        dx = -1; dy = 0;
    } else if ((key === 'arrowright' || key === 'd') && dx === 0) {
        dx = 1; dy = 0;
    }
}

function startGame() {
    if (gameLoopIdentifier) clearInterval(gameLoopIdentifier);
    gameLoopIdentifier = setInterval(gameLoop, GAME_SPEED);
}

function gameLoop() {
    update();
    draw();
}

function update() {
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check collisions
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score.toString().padStart(3, '0');
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore.toString().padStart(3, '0');
            localStorage.setItem('snakeHighScore', highScore);
        }
        generateFood();
        // Speed up a bit
        if (GAME_SPEED > 50) {
            clearInterval(gameLoopIdentifier);
            GAME_SPEED -= 1;
            gameLoopIdentifier = setInterval(gameLoop, GAME_SPEED);
        }
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
    // Check if food spawned on snake
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood();
            break;
        }
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        const isHead = index === 0;
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        const size = GRID_SIZE - 2;

        ctx.fillStyle = isHead ? '#00ff88' : 'rgba(0, 255, 136, 0.6)';
        
        // Draw rounded rectangle
        drawRoundedRect(ctx, x, y, size, size, isHead ? 6 : 4);
        
        if (isHead) {
            // Add glow to head
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ff88';
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    });

    // Draw food
    const fx = food.x * GRID_SIZE;
    const fy = food.y * GRID_SIZE;
    ctx.fillStyle = '#ff0055';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0055';
    drawRoundedRect(ctx, fx, fy, GRID_SIZE - 2, GRID_SIZE - 2, 10);
    ctx.shadowBlur = 0;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function gameOver() {
    clearInterval(gameLoopIdentifier);
    overlayText.textContent = '遊戲結束';
    overlay.classList.remove('hidden');
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    GAME_SPEED = 100;
    scoreElement.textContent = '000';
    overlay.classList.add('hidden');
    isFirstMove = true;
    generateFood();
    draw();
}

// Initial call
init();
