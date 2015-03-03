// initialization
var game = new Phaser.Game(500, 550, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var snake1, snake2;
var food=[];
var len=20;
var movement_timer, game_timer;
var game_timer_event;
var score=0, score_text=0, timer_seconds=0, game_timer_text=0;
var sound_vibrate;

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_snake1', 'assets/snake1.png');
	this.game.load.image('sprite_snake2', 'assets/snake2.png');
    this.game.load.spritesheet('sprite_food', 'assets/food.png', 20, 20);
	this.game.load.image('sprite_gameover', 'assets/gameover.png');
	this.game.load.bitmapFont('font_c&l', 'assets/champagne&limousines.png', 'assets/champagne&limousines.fnt');
	this.load.audio('audio_vibrate', 'assets/vibrate.mp3');	
}

function create() {
    // images
    this.game.add.sprite(0, 0, 'sprite_bg');
	
	score_text = this.game.add.bitmapText(450, 18, 'font_c&l', score.toString(), 19);
	//game_timer_text = this.game.add.bitmapText(248, 15, 'font_c&l', timer_seconds.toString(), 25);
	score_text.setText(score.toString());
	score_text.visible = true;
	
	cursors = this.game.input.keyboard.createCursorKeys();
	wasd = 	{	up:		this.game.input.keyboard.addKey(Phaser.Keyboard.W),
				down: 	this.game.input.keyboard.addKey(Phaser.Keyboard.S),
				left:	this.game.input.keyboard.addKey(Phaser.Keyboard.A),
				right:	this.game.input.keyboard.addKey(Phaser.Keyboard.D)
			};
    
	sound_vibrate = this.game.add.audio('audio_vibrate');
	
	snake2 = new Snake(this.game, 200, 300, 'u', 'sprite_snake2');
    snake1 = new Snake(this.game, 300, 300, 'u', 'sprite_snake1');
	initTimer();
	initFood();
	//game_timer = this.game.time.create();
	//game_timer_event = game_timer.add(Phaser.Timer.SECOND * 30, endTimer, this.game);
	//game_timer.start();
}

function update() { 
	snake1.updateS1Movement();
	snake2.updateS2Movement();
}

/*function render() {
	if(game_timer.running) {
		timer_seconds = Math.round((game_timer_event.delay - game_timer.ms) / 1000);
		game_timer_text.setText(timer_seconds.toString());
	}
	else {
		this.game.add.sprite(0, 50, 'sprite_gameover');
	}
}

function endTimer() {
	game_timer.stop();
}*/

function move() {

	snake1.move();
	if(checkOwnCollision(snake1)) {
		this.game.add.sprite(0, 50, 'sprite_gameover');
		destroy();
	}
	var result = checkFoodCollision(snake1.body[0]);
	if(result[0]) {
		sound_vibrate.play();
		snake1.grow(food[result[1]].framenum+1);
		score += food[result[1]].framenum+1;
		food[result[1]].sprite.destroy();
		food[result[1]] = new Food(this.game);
		score_text.setText(score.toString());
		//snake1.flip = !snake1.flip;
	}
	var temp = snake1.body.pop();
	snake1.body.unshift(temp);
	snake1.canMove = true;
	
	snake2.move();
	if(checkOwnCollision(snake2)) {
		this.game.add.sprite(0, 50, 'sprite_gameover');
		destroy();
	}
	var result = checkFoodCollision(snake2.body[0]);
	if(result[0]) {
		sound_vibrate.play();
		snake2.grow(food[result[1]].framenum+1);
		score += food[result[1]].framenum+1;
		food[result[1]].sprite.destroy();
		food[result[1]] = new Food(this.game);
		score_text.setText(score.toString());
		//snake1.flip = !snake1.flip;
	}
	var temp = snake2.body.pop();
	snake2.body.unshift(temp);
	snake2.canMove = true;	
	
	if(checkSnakeCollision()) {
		this.game.add.sprite(0, 50, 'sprite_gameover');
		destroy();
	}
}

function checkCollision(a, b) {
	// actual sprites are smaller than their bounds
	var bounds_a = a.getBounds();
	var bounds_b = b.getBounds();
	bounds_a.height = bounds_a.width = bounds_b.height = bounds_b.width = 19.9;

	return Phaser.Rectangle.intersects(bounds_a, bounds_b);
}

// snake collide with itself
function checkOwnCollision(snake) {
	for(var i=1; i<snake.body.length; i++) {
		var temp = snake.body[i];
		if(checkCollision(snake.body[0], temp)) {
			return true;
		}
	}
	return false;
}

// snake collide with another snake
function checkSnakeCollision() {
	for(var i=0; i<snake1.body.length; i++) {
		for(var j=0; j<snake2.body.length; j++) {
			if(checkCollision(snake2.body[j], snake1.body[i])) {
				return true;
			}
		}
	}
	return false;

}

// snake collide with food[]
function checkFoodCollision(mouth) {
	for(var i=0; i<food.length; i++) {
		var temp = food[i].sprite;
		if(checkCollision(mouth, temp)) {
			return [true, i];
		}
	}
	return [false, -1];
}

function initTimer() {
	movement_timer = this.game.time.events.loop(200, move, this);
}

function initFood() {
	for(var i=0; i<10; i++) {
		food[i] = new Food(this.game);
	}
}

function destroy() {
	for(var i=0; i<snake1.body.length; i++) {
		snake1.body[i].destroy();
	}
	for(var j=0; j<snake2.body.length; j++) {
		snake2.body[j].destroy();
	}
}

