<!DOCTYPE html>
<html>
	<head>
		<title>Runner Test</title>
		<link rel="stylesheet" type="text/css" href="css/game.css">
	</head>
	<body>
		<script type="text/javascript" src="js/pixi.dev.js"></script>
		<script type="text/javascript" src="js/vSprite.js"></script>
		<script type="text/javascript" src="js/background.js"></script>
		<script type="text/javascript">

			var assetsToLoader = ["Horse.json"];
			loader = new PIXI.AssetLoader(assetsToLoader);
			loader.onComplete = init;
			loader.load();

			function init() {

				var width = 800;
				var height = 600;
				var interactive = true;

				stage = new PIXI.Stage(0x7EDCFF, interactive);
				renderer = PIXI.autoDetectRenderer(
					width,
					height
				);

				stage.click = handleTap;

				// set the canvas width and height to fill the screen
		        renderer.view.style.width = window.innerWidth + "px";
		        renderer.view.style.height = window.innerHeight + "px";
		        renderer.view.style.display = "block";

		        document.body.appendChild(renderer.view);

				bg = new Background(renderer, stage);

				var horseTextures = [];
				for(var i = 0; i < 4; i++) {
					var texture = PIXI.Texture.fromFrame("Horse " + (i+1) + ".png");
					horseTextures.push(texture);
				}

				horse = new PIXI.MovieClip(horseTextures);
				horse.position.x = 20;
				horse.position.y = 445;
				horse.gotoAndPlay(Math.random() * 3);
				horse.animationSpeed = 0.08;
				isJumping = false;

				stage.addChild(horse);

				requestAnimFrame(update);
			}

			function update() {
				
				bg.update();

				if(isJumping) {
					horse.position.y -= 3.5 * 0.96;
					horse.position.x += 1;

					horse.gotoAndPlay(0);
					horse.stop();

					horse.rotation = -0.15 * Math.PI;

					if(horse.position.y <= 260) {
						isJumping = false;
					}
				} else {

					horse.rotation = 0.15 * Math.PI;

					if(horse.position.y < 445) {
						horse.position.y += 3.5 * 0.96;
						horse.position.x += 1;
					}
				}

				if(horse.position.y > 440 && horse.position.y < 450) {
					horse.play();
					horse.rotation = 0;
				}

				renderer.render(stage);
				requestAnimFrame(update);

			}

			function handleTap() {
				isJumping = true;
			}
		</script>
	</body>
</html>