// width=600, height= 600 
// start_x=0, start_y=50
//snake length = 20, need to go in multiples of 20

function Food(game) { 
    this.game = game;
    this.make();
}

Food.prototype.make = function() {
    var x = Math.floor(Math.random()*30);
    var y = Math.floor(Math.random()*30);
    x = x * 20;
    y = y * 20 + 50;
    this.game.add.sprite(x, y, 'sprite_food');
}
