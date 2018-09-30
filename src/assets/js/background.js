/**
* @class Background
*/
function Background(stage) {


	this.bgObject = new vSprite('assets/images/citybg.gif', 0, 0);
	stage.addChild(this.bgObject);

}

Background.constructor = Background;