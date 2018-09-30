/**
* @class Volcano Sprite
*/
function vSprite(texture, x, y, velocity, scale) {

	PIXI.Sprite.call(this, (typeof texture == 'string') ? PIXI.Texture.fromImage(texture) : texture);

	if(x == undefined) x = 0;
	this.position.x = (x == undefined) ? 0 : x;
	this.position.y = (y == undefined) ? 0 : y;
	this.velocity = (velocity == undefined) ? {x: 0, y: 0} : velocity;
	this.scale.x = (scale == undefined) ? 1 : scale;
	this.scale.y = (scale == undefined) ? 1 : scale;

	return this;

}

vSprite.constructor = vSprite;
vSprite.prototype = Object.create(PIXI.Sprite.prototype);
vSprite.prototype.velocity = { x: 0, y: 0 };
vSprite.prototype.getWidth = function() {
	return this.width;
}