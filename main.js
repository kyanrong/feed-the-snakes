// initialization
var game = new Phaser.Game(600, 650, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var snake, food;
var lastdir;
var len=20;
var canMove;
var movement_timer;
var score=0, score_text=0;

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_snake', 'assets/snake.png');
    this.game.load.image('sprite_food', 'assets/food.png');
	this.game.load.bitmapFont('font_c&l', 'assets/champagne&limousines.png', 'assets/champagne&limousines.fnt');
}

function create() {
    // images
    this.game.add.sprite(0, 0, 'sprite_bg');
    
    // keyboard controls
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT]);
    
    key_up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    key_down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    key_up.onDown.add(up);
    key_down.onDown.add(down);
    key_left.onDown.add(left);
    key_right.onDown.add(right);
	
	score_text = this.game.add.bitmapText(553, 18, 'font_c&l', score.toString(), 19);
	score_text.visible = true;
    
	initSnake();
	initFood();
	initTimer();
}

function update() { 
    if(canMove) {
		if(key_up.isDown) {
            up();
        }
        if(key_down.isDown) {
            down();
        }
        if(key_left.isDown) {
            left();
        }
        if(key_right.isDown) {
            right();
        }
		canMove = false;
	}
}

//
function move() {
	var curr_len = snake.length;
	switch(lastdir) {
		case 'u':	snake[curr_len-1].y = snake[0].y - len;
					snake[curr_len-1].x = snake[0].x;
					break;
		case 'd':	snake[curr_len-1].y = snake[0].y + len;
					snake[curr_len-1].x = snake[0].x;
					break;
		case 'l':	snake[curr_len-1].x = snake[0].x - len;
					snake[curr_len-1].y = snake[0].y;
					break;
		case 'r':	snake[curr_len-1].x = snake[0].x + len;
					snake[curr_len-1].y = snake[0].y;
					break;
	}
	
	// if snake reaches boundary, make it appear at the opposite side
	if(snake[curr_len-1].x > 600) {
		snake[curr_len-1].x = 0;
	}
	if(snake[curr_len-1].x < 0) {
		snake[curr_len-1].x = 600;
	}
	if(snake[curr_len-1].y > 650) {
		snake[curr_len-1].y = 50;
	}
	if(snake[curr_len-1].y < 50) {
		snake[curr_len-1].y = 650;
	}
	
	if(checkCollision(snake[0], food)) {
		food.destroy();
		initFood();
		grow();
		score += 1;
		score_text.setText(score.toString());
	}
	
	var temp = snake.pop();
	snake.unshift(temp);
	canMove = true;
}

function up() {
    if(lastdir != 'd') {
        lastdir = 'u';
    }
}

function down() {
    if(lastdir != 'u') {
        lastdir = 'd';
    }                      
}

function left() {
    if(lastdir != 'r') {
        lastdir = 'l';
    }
}

function right() {
    if(lastdir != 'l') {
        lastdir = 'r';
    }
}

function checkCollision(a, b) {
	var bounds_a = a.getBounds();
	var bounds_b = b.getBounds();
	return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}

function grow() {
	var temp = this.game.add.sprite(snake[1].x, snake[1].y, 'sprite_snake');
	snake.splice(1, 0, temp);
}

// inits
function initSnake() {
	snake = [];
	for(var i=0; i<3; i++) {
		var temp = this.game.add.sprite(260+i*len, 260, 'sprite_snake');
		snake.push(temp);
	}
	lastdir = 'r';
	canMove = true;
}

function initTimer() {
	movement_timer = this.game.time.events.loop(200, move, this);
}

function initFood() {
	var x = Math.floor(Math.random()*30);
    var y = Math.floor(Math.random()*30);
    x = x * 20;
    y = y * 20 + 50;
	
	food = this.game.add.sprite(x, y, 'sprite_food');
}

