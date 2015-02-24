// initialization
var game = new Phaser.Game(600, 650, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var key_up, key_down, key_left, key_right;
var snake;
var move_time=0, max_move_time=500, dir_time=0;
var lastdir='r';

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_snake', 'assets/snake.png');
    this.game.load.image('sprite_food', 'assets/food.png');
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
    
    snake = new Snake(this.game);
}

function update() { 
    //if(key_right.isDown) { if(this.game.time.now > dir_time) { snake.move('r'); dir_time = this.game.time.now + 150;}}
    
    if(this.game.time.now > move_time) {
        if(key_up.isDown) {
            if(lastdir != 'd')
                lastdir = 'd';
        }
        if(key_left.isDown) {
            if(lastdir != 'r')
                lastdir = 'l';
        }
        if(key_right.isDown) {
            if(lastdir != 'l')
                lastdir = 'r';
        }
        if(key_down.isDown) {
            if(lastdir != 'u')
                lastdir = 'd';
        }
        
        snake.move(lastdir);
        move_time = this.game.time.now + max_move_time;
    }
}


