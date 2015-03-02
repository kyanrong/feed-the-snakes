// width = 500, height = 500
// snake length = 20, need to go in multiples of 20

function Food(game) {
	this.game = game;
	this.framenum = Math.floor(Math.random()*5);
	this.start_x = Math.floor(Math.random()*25) * 20;
	this.start_y = Math.floor(Math.random()*25) * 20 + 50;
	this.sprite =this.spawn();
}

Food.prototype.spawn = function() {
	var temp = this.game.add.sprite(this.start_x, this.start_y, 'sprite_food', this.framenum);
	return temp;
}

