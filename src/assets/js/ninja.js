var LEFT = 'left';
var RIGHT = 'right';
var MAX_STARS_PER_NINJA = 3;
var JUMP_HEIGHT = 300;
var VELOCITY_Y = 15;
var VELOCITY_X = 6;

/**
* @class Ninja
*/
function Ninja(stage, renderer, id, x, y) {

	playerObject = new PIXI.Graphics();
	playerObject.lineStyle(1, 0xff9600, 1);

	this.debugObject = null;

	this.id = id;
	this.renderer = renderer;

	this.isJumping = false;
	this.canJump = true;
	this.isFalling = false;
	this.jumpPosition = y;

	this.currentPlatform = null;

	this.isMovingLeft = false;
	this.isMovingRight = false;

	this.originalY = y;
	this.originalX = x;

	this.velocityY = VELOCITY_Y;
	this.velocityX = VELOCITY_X;

	this.ninja = new vSprite(
		     PIXI.TextureCache[(id == 1) ? 'blueNinjaRight' : 'redNinjaLeft'],
			 x,
			 y,
			 {x: 0, y: 0},
			 0.2);

	(id == 1) ? this.ninja.direction = RIGHT : this.ninja.direction = LEFT;

	this.stage = stage;

	stage.addChild(this.ninja);
	stage.addChild(playerObject);

	this.life();

}

Ninja.constructor = Ninja;

Ninja.prototype.life = function() {
	// Spawn lifebar above head
	this.lifebar = new Life(this.renderer, this.ninja);
}

Ninja.prototype.jump = function() {

	if(this.canJump) {
		this.jumpPosition = this.ninja.position.y - JUMP_HEIGHT;	
		this.isJumping = true;
		this.canJump = false;
		this.isGrounded = false;
	}

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

Ninja.prototype.predictX = function() {

	var x = this.ninja.position.x;

	if(this.isMovingLeft) x -= this.velocityX;
	if(this.isMovingRight) x += this.velocityX;

	return x;

};

Ninja.prototype.predictY = function() {

	var y = this.ninja.position.y;

	if(this.isJumping) y -= this.velocityY;
	if(this.isFalling) y += this.velocityY;

	return y;

};

Ninja.prototype.update = function() {

	this.lifebar.update();

	var nextX = this.predictX();
	var nextY = this.predictY();

	if(this.isJumping) {
		this.isFalling = false;

		var newY = this.jumpPosition;

		for(platform in platforms) {
			var p = platforms[platform];

			if((nextX + this.ninja.width) >= p.position.x && nextX <= p.position.x + p.width) {
				if(nextY >= p.position.y && nextY <= p.position.y + p.height) {
					this.isJumping = false;
					this.isFalling = true;
					return;
				}
			}

		}

		if(this.ninja.position.y <= newY) {
			this.isJumping = false;
			this.isFalling = true;
		} else {
			this.ninja.position.y = nextY;
		}

	}

	if(this.isFalling) {

		if(this.ninja.position.y != this.originalY && this.isGrounded) {
			nextY = this.currentPlatform.position.y - this.ninja.height;

			if((nextX + this.ninja.width) > this.currentPlatform.position.x && nextX < this.currentPlatform.position.x + this.currentPlatform.width) {
				this.isGrounded = true;
			} else {
				this.isGrounded = false;
			}

		} else {
			for(platform in platforms) {
				var p = platforms[platform];

				if(nextY >= p.position.y && nextY <= p.position.y + p.height) {
					if((nextX + this.ninja.width) >= p.position.x && nextX <= p.position.x + p.width) {
						this.canJump = true;
						this.isGrounded = true;
						nextY = p.position.y - this.ninja.height;
						this.currentPlatform = p;
					}
				}
			}
		}

		if(nextY >= this.originalY) {
			this.canJump = true;
			this.isFalling = false;
			this.ninja.position.y = this.originalY;
		} else {
			this.ninja.position.y = nextY;
		}

	}

	if(this.isMovingLeft) {

		if(this.ninja.position.x > 0) {

			for(wall in walls) {
				if(collides(walls[wall], this.ninja, undefined, undefined, nextX - this.ninja.width/2)) {
					return;
				}
			}

			this.ninja.position.x = nextX;
		}
	}

	if(this.isMovingRight) {


		if((this.ninja.position.x + this.ninja.width) <= this.renderer.width) {

			for(wall in walls) {
				if(collides(walls[wall], this.ninja, undefined, undefined, nextX + this.ninja.width/2)) {
					return;
				}
			}

			this.ninja.position.x = nextX;
		}
			
	}

	if(this.renderer.drawDebugObjects) this.drawDebugObjects();

};

Ninja.prototype.drawDebugObjects = function() {

	/*if(this.debugObject != null) {

	} else {
		this.debugObject = 1;
		playerObject.drawRect(this.ninja.position.x, this.ninja.position.y, this.ninja.width, this.ninja.height);
	}*/

};

Ninja.prototype.object = function() {
	return this.ninja;
};