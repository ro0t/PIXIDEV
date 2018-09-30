/**
* @class Background
*/
function Background(renderer, stage) {

	this.farObjectOne = new vSprite('images/MountainsCloudsFar.png', 0, 88, {x: 1.128, y: 0});
	this.farObjectTwo = new vSprite('images/MountainsCloudsFar.png', 1028, 88, {x: 1.128, y: 0});

	stage.addChild(this.farObjectOne);
	stage.addChild(this.farObjectTwo);

	this.midObjectOne = new vSprite('images/MountainsCloudsClose.png', 0, 175, {x: 1.64, y: 0});
	this.midObjectTwo = new vSprite('images/MountainsCloudsClose.png', 1014, 175, {x: 1.64, y: 0});

	stage.addChild(this.midObjectOne);
	stage.addChild(this.midObjectTwo);

	this.cloudsObjectOne = new vSprite('images/CloudsNear.png', 0, 240, {x: 2.28, y: 0});
	this.cloudsObjectTwo = new vSprite('images/CloudsNear.png', 1028, 240, {x: 2.28, y: 0});

	stage.addChild(this.cloudsObjectOne);
	stage.addChild(this.cloudsObjectTwo);

	this.groundObjectOne = new vSprite('images/Ground.png', 0, (renderer.height - 96), {x: 2.56, y: 0});
	this.groundObjectTwo = new vSprite('images/Ground.png', 1200, (renderer.height - 96), {x: 2.56, y: 0});

	stage.addChild(this.groundObjectOne);
	stage.addChild(this.groundObjectTwo);

}

Background.constructor = Background;

Background.prototype.shift = function(obj, obj2) {

	if(obj.position.x <= -obj.width) {
		obj.position.x = obj2.position.x + obj2.width;
	}

	if(obj2.position.x <= -obj2.width) {
		obj2.position.x = obj.position.x + obj.width;
	}

}

Background.prototype.update = function() {

	var foo = this.farObjectOne;
	var fot = this.farObjectTwo;

	this.shift(foo, fot);
	foo.position.x -= foo.velocity.x;
	fot.position.x -= fot.velocity.x;

	var moo = this.midObjectOne;
	var mot = this.midObjectTwo;

	this.shift(moo, mot);
	moo.position.x -= moo.velocity.x;
	mot.position.x -= mot.velocity.x;

	var coo = this.cloudsObjectOne;
	var cot = this.cloudsObjectTwo;

	this.shift(coo, cot);
	coo.position.x -= coo.velocity.x;
	cot.position.x -= cot.velocity.x;

	var goo = this.groundObjectOne;
	var got = this.groundObjectTwo;
	
	this.shift(goo, got);
	goo.position.x -= goo.velocity.x;
	got.position.x -= got.velocity.x;


}