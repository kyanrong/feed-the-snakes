// width = 500, height = 500
// snake length = 20, need to go in multiples of 20

function Snake(game, x, y, dir, snaketype) {
	this.game = game;
	this.start_x = x;
	this.start_y = y;
	this.dir = dir;
	this.snaketype = snaketype;
	this.flip = false;
	this.canMove = true;
	this.body = [];
	
	for(var i=0; i<5; i++) {
		var temp = this.game.add.sprite(this.start_x-i*len, this.start_y, this.snaketype);
		this.body.push(temp);
	}
}

Snake.prototype.grow = function(num) {
	for(var i=0; i<num; i++) {
		var temp = this.game.add.sprite(this.body[1].x, this.body[1].y, this.snaketype);
		this.body.splice(1, 0, temp);
	}
}

Snake.prototype.move = function() {
	var currlen = this.body.length;
	switch(this.dir) {
		case 'u':	this.body[currlen-1].y = this.body[0].y - len;
					this.body[currlen-1].x = this.body[0].x;
					break;
		case 'd': 	this.body[currlen-1].y = this.body[0].y + len;
					this.body[currlen-1].x = this.body[0].x;
					break;
		case 'l':	this.body[currlen-1].x = this.body[0].x - len;
					this.body[currlen-1].y = this.body[0].y;
					break;
		case 'r':	this.body[currlen-1].x = this.body[0].x + len;
					this.body[currlen-1].y = this.body[0].y;
					break;			
	}
	
	// if snake reaches boundary, make it appear at the opposite side
	if(this.body[currlen-1].x > 500) {
		this.body[currlen-1].x = 0;
	}
	if(this.body[currlen-1].y < 0) {
		this.body[currlen-1].y = 500;
	}
	if(this.body[currlen-1].y > 550) {
		this.body[currlen-1].y = 50;
	}
	if(this.body[currlen-1].y < 50) {
		this.body[currlen-1].y = 550;
	}
}

Snake.prototype.updateS1Movement = function() {
	if(this.canMove) {
		if(!this.flip) {
			if(cursors.up.isDown) {
				if(this.dir!='d' && this.dir!='u') {
					this.dir = 'u';
					this.canMove = false;
				}
			}
			else if(cursors.down.isDown) {
				if(this.dir!='u' && this.dir!='d') {
					this.dir = 'd';
					this.canMove = false;
				}
			}
			if(cursors.left.isDown) {
				if(this.dir!='r' && this.dir!='l') {
					this.dir = 'l';
					this.canMove = false;
				}
			}
			else if(cursors.right.isDown) {
				if(this.dir!='l' && this.dir!='r') {
					this.dir='r';
					this.canMove = false;
				}
			}
		}
		else {
			if(cursors.up.isDown) {
				if(this.dir!='d' && this.dir!='u') {
					this.dir = 'd';
					this.canMove = false;
				}
			}
			else if(cursors.down.isDown) {
				if(this.dir!='u' && this.dir!='d') {
					this.dir = 'u';
					this.canMove = false;
				}
			}
			if(cursors.left.isDown) {
				if(this.dir!='r' && this.dir!='l') {
					this.dir = 'r';
					this.canMove = false;
				}
			}
			else if(cursors.right.isDown) {
				if(this.dir!='l' && this.dir!='r') {
					this.dir='l';
					this.canMove = false;
				}
			}
		}
	}
}

Snake.prototype.updateS2Movement = function() {
	if(this.canMove) {
		if(!this.flip) {
			if(wasd.up.isDown) {
				if(this.dir!='d' && this.dir!='u') {
					this.dir = 'u';
					this.canMove = false;
				}
			}
			else if(wasd.down.isDown) {
				if(this.dir!='u' && this.dir!='d') {
					this.dir = 'd';
					this.canMove = false;
				}
			}
			if(wasd.left.isDown) {
				if(this.dir!='r' && this.dir!='l') {
					this.dir = 'l';
					this.canMove = false;
				}
			}
			else if(wasd.right.isDown) {
				if(this.dir!='l' && this.dir!='r') {
					this.dir='r';
					this.canMove = false;
				}
			}
		}
		else {
			if(wasd.up.isDown) {
				if(this.dir!='d' && this.dir!='u') {
					this.dir = 'd';
					this.canMove = false;
				}
			}
			else if(wasd.down.isDown) {
				if(this.dir!='u' && this.dir!='d') {
					this.dir = 'u';
					this.canMove = false;
				}
			}
			if(wasd.left.isDown) {
				if(this.dir!='r' && this.dir!='l') {
					this.dir = 'r';
					this.canMove = false;
				}
			}
			else if(wasd.right.isDown) {
				if(this.dir!='l' && this.dir!='r') {
					this.dir='l';
					this.canMove = false;
				}
			}
		}
	}
}
