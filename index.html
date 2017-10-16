<!DOCTYPE html>
<html>
	<head>
		<title>Runner Test</title>
		<link rel="stylesheet" type="text/css" href="css/game.css">
	</head>
	<body>
		<script type="text/javascript" src="js/pixi.dev.js"></script>
		<script type="text/javascript" src="js/vSprite.js"></script>
		<script type="text/javascript" src="adamoglino/js/background.js"></script>
		<script type="text/javascript" src="adamoglino/js/level.js"></script>
		<script type="text/javascript" src="adamoglino/js/star.js"></script>
		<script type="text/javascript" src="adamoglino/js/life.js"></script>
		<script type="text/javascript" src="adamoglino/js/ninja.js"></script>
		<script type="text/javascript">

			var musicIsOn = false;
			var debug = false;
			var gameCounter = 0;

			loader = new PIXI.AssetLoader(['adamoglino/NinjaStar.json', 'adamoglino/Ninjas.json', 'adamoglino/Lifebar.json']);

			// 1270 x 720

			loader.onComplete = function(elm) {

				if(musicIsOn) {
					myAudio = new Audio('adamoglino/song.ogg'); 
					if (typeof myAudio.loop == 'boolean')
					{
					    myAudio.loop = true;
					}
					else
					{
					    myAudio.addEventListener('ended', function() {
					        this.currentTime = 0;
					        this.play();
					    }, false);
					}
					myAudio.play();
				}

				var width = 800;
				var height = 600;
				var interactive = true;
				stars = [];

				stage = new PIXI.Stage(0x7EDCFF, interactive);
				renderer = PIXI.autoDetectRenderer(
					width,
					height
				);

				// set the canvas width and height to fill the screen
		        renderer.view.style.width = window.innerWidth + "px";
		        renderer.view.style.height = window.innerHeight + "px";
		        renderer.view.style.display = "block";
		        renderer.drawDebugObjects = debug;

		        document.body.appendChild(renderer.view);

				bg = new Background(stage);

				floor = new vSprite('adamoglino/images/floor.png', 0, 530);
				stage.addChild(floor);

				ninjaOne = new Ninja(stage, renderer, 1, 40, 500);
				ninjaTwo = new Ninja(stage, renderer, 2, 720, 500);

				starTextures = [];
				for(var i = 0; i < 5; i++) {
					var texture = PIXI.Texture.fromFrame("star " + (i+1) + ".png");
					starTextures.push(texture);
				}

				level = new Level(renderer);
				level.draw();

				walls = level.getWalls();
				platforms = level.getPlatforms();

				input();
				requestAnimFrame(update);

			};

			loader.load();

			function input() {
				document.addEventListener('keydown', function() {
					if(event.keyCode == 37) { // Left
						ninjaTwo.moveLeft();
					}
					if(event.keyCode == 65) { // A
						ninjaOne.moveLeft();
					}

					if(event.keyCode == 87) { // W
						ninjaOne.jump();
					}
					if(event.keyCode == 38) { // Up
						ninjaTwo.jump();
					}

					if(event.keyCode == 68) { // D
						ninjaOne.moveRight();
					}
					if(event.keyCode == 39) { // Right
						ninjaTwo.moveRight();
					}

					if(event.keyCode == 96) { // Ctrl
						ninjaTwo.shoot();
					}

					if(event.keyCode == 32) { // Space
						ninjaOne.shoot();
					}
				});

				document.addEventListener('keyup', function() {
					
					if(event.keyCode == 65) {
						ninjaOne.stopMoveLeft();
					}
					if(event.keyCode == 37) {
						ninjaTwo.stopMoveLeft();
					}

					if(event.keyCode == 68) {
						ninjaOne.stopMoveRight();
					}
					if(event.keyCode == 39) {
						ninjaTwo.stopMoveRight();
					}
				});
			}

			function collides(object, item, onewX, onewY, inewX, inewY) {
				
				var objectX = (onewX == undefined) ? object.position.x : onewX;
				var objectY = (onewY == undefined) ? object.position.y : onewY;
				var itemX = (inewX == undefined) ? item.position.x : inewX;
				var itemY = (inewY == undefined) ? item.position.y : inewY;

				var xdist = objectX - itemX;

				if(xdist > -object.width/2 && xdist < object.width/2) {
					var ydist = objectY - itemY;

					if(ydist > -object.height/2 && ydist < object.height/2) {
						
						return true;
					}
				}

				return false;
			}

			function update() {
				
				++gameCounter;

				activeStars1 = 0;
				activeStars2 = 0;

				for(var i = 0; i < stars.length; i++) {
					(stars[i].id == 1) ? activeStars1++ : activeStars2++;
				}

				for(var i = 0; i < stars.length; i++) {
					stars[i].update(stars, i);

					if(stars[i] == undefined)
						continue;

					if(stars[i].id == 1 && collides(ninjaTwo.object(), stars[i].object())) {
						stars[i].remove(stars, i);
						ninjaTwo.loseLife();
					} else if(stars[i].id == 2 && collides(ninjaOne.object(), stars[i].object())) {
						stars[i].remove(stars, i);
						ninjaOne.loseLife();
					}
				}

				ninjaOne.update(gameCounter);
				ninjaTwo.update(gameCounter);

				if(gameCounter > 1000000)
					gameCounter = 0;

				renderer.render(stage);
				requestAnimFrame(update);
			}
		</script>
	</body>
</html>