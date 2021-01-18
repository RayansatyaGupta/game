class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on('value',(data)=>{
            gameState = data.val();
        })
    }
    update(state){
        database.ref('/').update({
            gameState:state
        })
    }
    async start(){
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once('value');
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount()
            }
            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200); 
        car2 = createSprite(300,200);
        car3 = createSprite(500,200);
        car4 = createSprite(700,200);
        cars = [car1,car2,car3,car4]

        car1.addImage(car1Img);
        car2.addImage(car2Img);
        car3.addImage(car3Img);
        car4.addImage(car4Img);
    }

    play(){
        form.hide();
        Player.getPlayerInfo();
        if(allPlayers!== undefined ){
            //var displayPosition = 100;
            background(90);
            image(trackImg,0,-displayHeight * 4, displayWidth, displayHeight * 5 );
            var index = 0;
            var x = 175;
            var y;
            for(var plr in allPlayers){
                index += 1;
                x += 210;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index ){
                   fill("red");
                   ellipse(x,y,60,60);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                }
                //displayPosition +=30;
                textSize(20);
                textAlign(CENTER)
                text(allPlayers[plr].name , cars[index - 1].x , cars[index - 1].y + 70)
            }
        }
        if(keyDown(UP_ARROW) && player.index!== null){
            player.distance += 10;
            player.update();
        }
        if(player.distance > 3800){
            gameState = 2;
        }
        drawSprites();

    }
}