/**
* @class Life
*/
function Life(renderer, ninja) {

	this.renderer = renderer;
	this.ninja = ninja;

	this.width = 86;
	this.height = 12;

	this.hp = 100;
	this.life = new vSprite(PIXI.TextureCache['life 100'],
			 0,
			 0,
			 {x: 0, y: 0},
			 1);

	this.life.anchor = {x:0.5, y:0.5};

	this.stage = stage;

	stage.addChild(this.life);

}

Life.constructor = Life;

Life.prototype.loseLife = function() {

	(this.hp == 20) ? this.hp -= 15 : this.hp -= 20;

	if( this.hp <= 0 ) {
        // TODO Add score to other player
        this.hp = 100;
    }

	this.life.setTexture(PIXI.TextureCache['life ' + this.hp]);

};

Life.prototype.update = function() {

	this.life.position.x = this.ninja.position.x + (this.ninja.width / 2);
	this.life.position.y = this.ninja.position.y - (this.height * 2);

};