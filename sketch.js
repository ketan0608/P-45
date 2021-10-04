var character,characterImg,characterImg2;
var groundImg,ground,invGround;
var score=0,g =0;
var sun,sunImg;
var obstacle,obstaclesGroup;

function preload(){
  groundImg = loadImage("Images/ground2.png");
  characterImg = loadImage("Images/character1.png");
  characterImg2 = loadImage("Images/character2.png");
  sunImg = loadImage("Images/Sun.png");
}

function setup() {
  createCanvas(800,300);

  ground = createSprite(400,250,100,5);
  ground.addImage(groundImg);

  invGround=createSprite(400,ground.y+20,1000,5)
  invGround.shapeColor = "white";

  character = createSprite(100,ground.y-35,50,50);
  character.addImage(characterImg);
  character.scale=1;

  sun = createSprite(610,70,50,50);
  sun.addImage(sunImg);
  sun.scale = 0.6;

  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  text("Score: "+ score, 500,50);

  if(keyDown("space") && character.y >= 198){
    character.velocityY = -12;
  }

  if(obstaclesGroup.isTouching(character)){
    g = 1;
}

if(g===0){
  character.velocityY = character.velocityY + 0.8;
  character.collide(invGround);
  ground.velocityX = ground.velocityX-0.1;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  spawnObstacles();
  score = score + Math.round(getFrameRate()/60);
}

  if(g===1){
    ground.velocityX = 0;
    character.velocityY = -0.9;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1000,ground.y-35,50,50);
    obstacle.velocityX = -(6 + 3*score/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.shapeColor = "green";
              break;
      case 2: obstacle.shapeColor = "red";
              break;
      case 3: obstacle.shapeColor = "orange"
      default: break;
    }
    obstacle.scale = 0.4;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
  }
}