var LEFT = 'left';
var RIGHT = 'right';
var MAX_STARS_PER_NINJA = 3;

/**
* @class Ninja
*/
function Ninja(stage, renderer, id, x, y) {

	this.id = id;
	this.renderer = renderer;

	this.isJumping = false;
	this.canJump = true;

	this.isMovingLeft = false;
	this.isMovingRight = false;

	this.newY = 0;
	this.newX = 0;

	this.originalY = y;
	this.originalX = x;

	this.velocityY = 15;
	this.velocityX = 6;

	this.ninja = new vSprite(
		     PIXI.TextureCache[(id == 1) ? 'blueNinjaRight' : 'redNinjaLeft'],
			 x,
			 y,
			 {x: 0, y: 0},
			 0.2);

	(id == 1) ? this.ninja.direction = RIGHT : this.ninja.direction = LEFT;

	this.stage = stage;

	stage.addChild(this.ninja);

	this.life();

}

Ninja.constructor = Ninja;

Ninja.prototype.life = function() {
	// Spawn lifebar above head
	this.lifebar = new Life(this.renderer, this.ninja);
}

Ninja.prototype.jump = function() {
	if(this.canJump)
		this.isJumping = true;
};

Ninja.prototype.moveLeft = function() {

	this.ninja.direction = LEFT;

	if(this.id == 1) {
		this.ninja.setTexture(PIXI.TextureCache['blueNinjaLeft']);
	} else if(this.id == 2) {
		this.ninja.setTexture(PIXI.TextureCache['redNinjaLeft']);
	}

	this.isMovingLeft = true;
};

Ninja.prototype.moveRight = function() {

	this.ninja.direction = RIGHT;

	if(this.id == 1) {
		this.ninja.setTexture(PIXI.TextureCache['blueNinjaRight']);
	} else if(this.id == 2) {
		this.ninja.setTexture(PIXI.TextureCache['redNinjaRight']);
	}

	this.isMovingRight = true;
};

Ninja.prototype.stopMoveLeft = function() {
	this.isMovingLeft = false;
};

Ninja.prototype.stopMoveRight = function() {
	this.isMovingRight = false;
};

Ninja.prototype.shoot = function() {

	if(this.id == 1) {
		if(activeStars1 > MAX_STARS_PER_NINJA - 1)
			return;
	} else if(this.id == 2) {
		if(activeStars2 > MAX_STARS_PER_NINJA - 1)
			return;
	}

	stars.push(new Star(this.renderer, this.id, this.ninja));
};

Ninja.prototype.loseLife = function() {
	this.lifebar.loseLife();
}

Ninja.prototype.update = function() {

	this.lifebar.update();

	if(this.isJumping) {
		this.newY = this.originalY - 300;

		this.ninja.position.y -= this.velocityY;

		if(this.ninja.position.y <= this.newY) {
			this.isJumping = false;
			this.canJump = false;
		}

	} else {

		this.newY = this.originalY;

		this.ninja.position.y += this.velocityY;

		if(this.ninja.position.y >= this.originalY) {
			this.canJump = true;
			this.ninja.position.y = this.originalY;
		}

	}

	if(this.isMovingLeft) {
		if(this.ninja.position.x + 10 > 0) {
			this.ninja.position.x -= this.velocityX;
		}
	}

	if(this.isMovingRight) {
		if((this.ninja.position.x - 10 + this.ninja.width) <= this.renderer.width)
			this.ninja.position.x += this.velocityX;
	}

};

Ninja.prototype.object = function() {
	return this.ninja;
};