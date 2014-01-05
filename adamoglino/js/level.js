/**
* @class Level
*/
function Level(renderer) {

	this.renderer = renderer;

	wallTexture = PIXI.Texture.fromImage('adamoglino/images/wall.png');
	platformTexture = PIXI.Texture.fromImage('adamoglino/images/platform.png');

	floorObject = new PIXI.Graphics();
	floorObject.lineStyle(1, 0xff0000, 1);

	this.objects = [];
}

Level.constructor = Level;

Level.prototype.draw = function() {

	// Top Left
	this.objects.push({position: {x: 1, y: 170}, width: 200, height: 32});

	// Top Right
	this.objects.push({position: {x: (renderer.width - 200), y: 170}, width: 200, height: 32});

	// Middle
	this.objects.push({position: {x: (renderer.width/2 - 150), y: 350}, width: 300, height: 32});

	// Left wall
	this.objects.push({position: {x: 100, y: (renderer.height - 140)}, width: 32, height: 100});

	// Right wall
	this.objects.push({position: {x: (renderer.width - 140), y: (renderer.height - 140)}, width: 32, height: 100});

	this.drawObjects();
	if(this.renderer.drawDebugObjects) this.drawDebugObjects();

};

Level.prototype.getObjects = function() {
	return this.objects;
};

Level.prototype.getPlatforms = function() {

	var platforms = [];

	for(object in this.objects) {
		var scope = this.objects[object];

		if(scope.width > scope.height) {
			platforms.push(scope);
		}
	}

	return platforms;

};

Level.prototype.getWalls = function() {

	var walls = [];

	for(object in this.objects) {
		var scope = this.objects[object];

		if(scope.width < scope.height) {
			walls.push(scope);
		}
	}

	return walls;

};

Level.prototype.drawObjects = function() {

	for(object in this.objects) {
		var scope = this.objects[object];

		if(scope.width > scope.height) {
			// Platform
			var platform = new PIXI.TilingSprite(platformTexture, scope.width, scope.height);
			platform.position.x = scope.position.x;
			platform.position.y = scope.position.y;

			stage.addChild(platform);

		} else {
			// Wall
			var wall = new PIXI.TilingSprite(wallTexture, scope.width, scope.height);
			wall.position.x = scope.position.x;
			wall.position.y = scope.position.y;

			stage.addChild(wall);
		}

	}

};

Level.prototype.drawDebugObjects = function() {

	for(object in this.objects) {
		var scope = this.objects[object];

		floorObject.drawRect(scope.position.x, scope.position.y, scope.width, scope.height);
	}

	stage.addChild(floorObject);

};