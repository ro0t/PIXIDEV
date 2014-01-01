/**
* @class Star
*/
function Star(renderer, id, ninja) {

	this.id = id;
	this.renderer = renderer;
	this.ninja = ninja;
	this.direction = ninja.direction;

	this.star = new PIXI.MovieClip(starTextures);
	
	if(this.direction == 'right') {
		this.star.position.x = ninja.position.x + ninja.width;
	} else {
		this.star.position.x = ninja.position.x - 1;
	}
	
	this.star.position.y = ninja.position.y + (ninja.height / 2);
	this.star.scale = ninja.scale;
	this.star.animationSpeed = 0.8;
	this.star.play();

	this.velocityX = 12.3;

	stage.addChild(this.star);

}

Star.constructor = Star;

Star.prototype.update = function(stars, index) {

	if(this.direction == 'right') {
		// Move right
		this.star.position.x += this.velocityX;

		if(this.star.position.x > this.renderer.width) {
			this.remove(stars, index);
		}
	} else {
		// Move left
		this.star.position.x -= this.velocityX;

		if(this.star.position.x + this.star.width < 0) {
			this.remove(stars, index);
		}
	}
};

Star.prototype.remove = function(stars, index) {

	try
	{
		stage.removeChild(this.star);
		stars.splice(index, 1);
	}
	catch(err)
	{
		console.log(err);
	}

};

Star.prototype.object = function() {
	return this.star;
};