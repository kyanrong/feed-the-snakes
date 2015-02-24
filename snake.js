// width=600, height= 600 
// start_x=0, start_y=50
//snake length = 20, need to go in multiples of 20

function Snake(game) { 
    this.game = game;
    this.start_x = 260;
    this.start_y = 260;
    this.block_length = 20;
    this.body = new Array();
    this.init();
}

Snake.prototype.init = function() {
    this.body.length = 0;
    this.body[0] = game.add.sprite(this.start_x, this.start_y, 'sprite_snake');
    this.body[1] = game.add.sprite(this.start_x-20, this.start_y, 'sprite_snake');
    this.body[2] = game.add.sprite(this.start_x-40, this.start_y, 'sprite_snake');
}
    
Snake.prototype.move = function(dir) {
    switch(dir) {
        case 'u':
            this.moveUp();
            break;
        case 'd':
            this.moveDown();
            break;
        case 'l':
            this.moveLeft();
            break;
        case 'r':
            this.moveRight();
            break;
    }
}

Snake.prototype.moveUp = function() {
}

Snake.prototype.moveDown = function() {
}

Snake.prototype.moveLeft = function() {
    if(this.body[0].x + this.block_length < 0) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].x = -i*this.block_length + 600;
        }
    }
    for(var i=0; i<this.body.length; i++) {
        this.body[i].x -= 20;
    }
}

Snake.prototype.moveRight = function() {
    if(this.body[0].x + this.block_length > 600) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].x = -i*this.block_length;
        }
    }
    for(var i=0; i<this.body.length; i++) {
        this.body[i].x += 20;
    }
}

    