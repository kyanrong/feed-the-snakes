// initialization
var game = new Phaser.Game(600, 650, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var key_up, key_down, key_left, key_right;
var snake, food;
var move_time=0, max_move_time=300, dir_time=0;
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
    
    key_up.onDown.add(up);
    key_down.onDown.add(down);
    key_left.onDown.add(left);
    key_right.onDown.add(right);
    
    snake = new Snake(this.game);
    food = new Food(this.game);
}

function update() { 
    //if(key_right.isDown) { if(this.game.time.now > dir_time) { snake.move('r'); dir_time = this.game.time.now + 150;}}
    
    if(this.game.time.now > move_time) {
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
        
        snake.move(lastdir);
        move_time = this.game.time.now + max_move_time;
        
        if(snake.body[0].x+20 > food.x-5 ||
           snake.body[0].x+20 < food.x+20-5 ||
           snake.body[0].y+20 > food.y-5 ||
           snake.body[0].y+20 < food.y+20-5) {
            food.destroy();
            food = new Food(this.game);
        }
    }
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

