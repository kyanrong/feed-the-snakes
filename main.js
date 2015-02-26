// initialization
var game = new Phaser.Game(500, 550, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var snake, food;
var lastdir;
var len=20;
var canMove;
var movement_timer;
var score=0, score_text=0;
var flip;
var group;

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_snake', 'assets/snake.png');
    this.game.load.image('sprite_food', 'assets/food.png');
	this.game.load.image('sprite_gameover', 'assets/gameover.png');
	this.game.load.image('sprite_s1', 'assets/s1.png');
	this.game.load.bitmapFont('font_c&l', 'assets/champagne&limousines.png', 'assets/champagne&limousines.fnt');
	
}

function create() {
    // images
    this.game.add.sprite(0, 0, 'sprite_bg');
	
	score_text = this.game.add.bitmapText(460, 18, 'font_c&l', score.toString(), 19);
	score_text.setText(score.toString());
	score_text.visible = true;
	
	cursors = this.game.input.keyboard.createCursorKeys();
    
	initSnake();
	initTimer();
	initFood();
}

function update() { 
    if(canMove) {
		if(!flip) {
			if (cursors.up.isDown) {
				if(lastdir!='d' && lastdir!='u'){
					lastdir = 'u';
					canMove = false;
				}
			}
			else if (cursors.down.isDown) {
				if(lastdir!='u' && lastdir!='d'){
					lastdir = 'd';
					canMove = false;
				}        
			}
			if (cursors.left.isDown) {
				if(lastdir!='r' && lastdir!='l'){
					lastdir = 'l';
					canMove = false;
				}
			}
			else if (cursors.right.isDown) {
				if(lastdir!='l' && lastdir!='r'){
					lastdir = 'r';
					canMove = false;
				}
			}
		}
		else {
			if(cursors.up.isDown) {
				if(lastdir!='d' && lastdir!= 'u') {
					lastdir = 'd';
					canMove = false;
				}
			}
			else if(cursors.down.isDown) {
				if(lastdir!='u' && lastdir!='d') {
					lastdir = 'u';
					canMove = false;
				}
			}
			if(cursors.left.isDown) {
				if(lastdir!='r' && lastdir!='l') {
					lastdir = 'r';
					canMove = false;
				}
			}			
			else if(cursors.right.isDown) {
				if(lastdir!='l' && lastdir!='r') {
					lastdir = 'l';
					canMove = false;
				}
			}
		}
		
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
	if(snake[curr_len-1].x > 500) {
		snake[curr_len-1].x = 0;
	}
	if(snake[curr_len-1].x < 0) {
		snake[curr_len-1].x = 500;
	}
	if(snake[curr_len-1].y > 550) {
		snake[curr_len-1].y = 50;
	}
	if(snake[curr_len-1].y < 50) {
		snake[curr_len-1].y = 550;
	}
	
	if(checkSnakeCollision()) {
		this.game.add.sprite(0, 50, 'sprite_gameover');
	}
	
	if(checkCollision(snake[0], food)) {
		food.destroy();
		initFood();
		grow();
		score += 1;
		score_text.setText(score.toString());
		flip = !flip;
	}
	
	var temp = snake.pop();
	snake.unshift(temp);
	canMove = true;
}

function checkCollision(a, b) {
	// actual sprites are smaller than their bounds
	var bounds_a = a.getBounds();
	var bounds_b = b.getBounds();
	bounds_a.height = bounds_a.width = bounds_b.height = bounds_b.width = 19.9;

	return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}

function checkSnakeCollision() {
	for(var i=1; i<snake.length; i++) {
		var temp = snake[i];
		if(checkCollision(snake[0], temp)) {
			return true;
		}
	}
	return false;
}

function grow() {
	var temp = this.game.add.sprite(snake[1].x, snake[1].y, 'sprite_snake');
	snake.splice(1, 0, temp);
}

// inits
function initSnake() {
	group = new Phaser.Group(this.game);
	snake = [];
	for(var i=0; i<5; i++) {
		var temp = this.game.add.sprite(260-i*len, 260, 'sprite_snake');
		snake.push(temp);
		group.add(temp);
	}
	lastdir = 'r';
	flip = false;
	canMove = true;
}

function initTimer() {
	movement_timer = this.game.time.events.loop(200, move, this);
}

function initFood() {
	var x = Math.floor(Math.random()*25);
    var y = Math.floor(Math.random()*25);
    x = x * 20;
    y = y * 20 + 50;
	
	food = this.game.add.sprite(x, y, 'sprite_food');
}

