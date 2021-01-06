var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var background, backgroundImage;


function preload(){
  
  backgroundImage = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,600);
  
  //create monkey
 monkey=createSprite(80,218,20,200);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale=0.1;
  
  
  //creating background
  background = createSprite(0,0,400,600);
  background.addImage(backgroundImage);
  background.scale = 1
  background.depth=background.depth-1
  
  
  //creating ground
  ground=createSprite(400,250,900,10);
  ground.velocityX=4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false
  
  
 bananasGroup = createGroup();
 obstaclesGroup = createGroup();

  score=0;
  
}


function draw() {
    

  if (background.x < 0){
      background.x = background.width/2;
    }
  
stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 300,50);
  

  if(gameState === PLAY){
    //move the background   
  background.velocityX = -3 
    ground.velocityX = -(4 + 2*score/300);
    //scoring
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 
  if (keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
  
  
  if (obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
  
  if (bananasGroup.isTouching(monkey)){
    score = score+1;
    monkey.scale=monkey.scale+0.0000007
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnBananas();
  }
  
   if (gameState===END){
  ground.velocityX = 0;
  background.velocityX = 0;
  monkey.velocityY = 0;
     obstaclesGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
bananasGroup.destroyEach();
    reset();
  }

  monkey.collide(ground);
  
  drawSprites();


}

function spawnObstacles(){
   if (frameCount % 300 === 0){
   var obstacle = createSprite(400,225,10,40);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
     obstacle.velocityX=-3;
   obstacle.addImage(obstacleImage);
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
}
  
}
function spawnBananas() {
  //write code here to spawn the Bananas
  if (frameCount % 100 ===0 ) {
  var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananasGroup.add(banana);

  }
  
}

 

 function reset(){
  gameState=PLAY;  
}




