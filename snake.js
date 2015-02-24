// width=600, height= 600 
// start_x=0, start_y=50
//snake length = 20, need to go in multiples of 20

function Snake(game) { 
    this.game = game;
    this.start_x = 260;
    this.start_y = 260;
    this.block_len = 20;
    this.body = new Array();
    this.init();
    this.curr_len = 0;
}

Snake.prototype.init = function() {
    this.body.length = 0;
    for(var i=0; i<3; i++) {
        this.body[i] = this.game.add.sprite(this.start_x-i*this.block_len, this.start_y, 'sprite_snake');
    }
}
    
Snake.prototype.move = function(dir) {
    this.curr_len = this.body.length;
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
    if(this.body[0].y + this.block_len < 120) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].y = -i*this.block_len + 600;
        }
    }
    var turn_x = this.body[0].x;
    var turn_y = this.body[0].y;
    for(var i=1; i<this.body.length; i++) {
        this.body[i].x = turn_x;
        this.body[i].y = turn_y;
        for(var j=0; j<i; j++) {
            this.body[j].y -= 20;
        }
    }
}

Snake.prototype.moveDown = function() {
    if(this.body[0].y + this.block_len > 600) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].y = -i*this.block_len + 50;
        }
    }
    var turn_x = this.body[0].x;
    var turn_y = this.body[0].y;
    for(var i=1; i<this.body.length; i++) {
        this.body[i].x = turn_x;
        this.body[i].y = turn_y;
        for(var j=0; j<i; j++) {
            this.body[j].y += 20;
        }
    }
}

Snake.prototype.moveLeft = function() {
    if(this.body[0].x + this.block_len < 0) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].x = -i*this.block_len+600;
        }
    }
    var turn_x = this.body[0].x;
    var turn_y = this.body[0].y;
    for(var i=1; i<this.body.length; i++) {
        this.body[i].x = turn_x;
        this.body[i].y = turn_y;
        for(var j=0; j<i; j++) {
            this.body[j].x -= 20;
        }
    }
}

Snake.prototype.moveRight = function() {  
    if(this.body[0].x + this.block_len > 600) {
        for(var i=0; i<this.body.length; i++) {
            this.body[i].x = -i*this.block_len;
        }
    }
    var turn_x = this.body[0].x;
    var turn_y = this.body[0].y;
    for(var i=1; i<this.body.length; i++) {
        this.body[i].x = turn_x;
        this.body[i].y = turn_y;
        for(var j=0; j<i; j++) {
            this.body[j].x += 20;
        }
    }
    
}

// destroy everything after the head
Snake.prototype.kill = function() {
    for(var i=0; i<this.body.length; i++) {
        this.body[i].destroy();
    }
}