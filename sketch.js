//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock

function preload()
{
  //load images here
  dogHappy = loadImage("dogImg.png");
  dogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database()

  createCanvas(500, 500);
    
  dog = createSprite(250, 250, 20, 20)
  dog.addImage(dogImg);
  dog.scale = 0.1

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46,139,85)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogHappy)
  }

  drawSprites();
  //add styles here
  textSize(20)
  fill("black")
  text("Note: Press Up Arrow Key To Feed Drago Milk!", 50, 50)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}