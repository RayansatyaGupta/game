class Form{
    constructor(){
        this.title = createElement('h1');
        this.input = createInput('name');
        this.button = createButton('Play');
        this.reset = createButton('Reset');
        this.greeting = createElement('h2');
    }
    hide(){
       this.title.hide();
       this.input.hide();
       this.button.hide();
       this.greeting.hide();
       
    }
    display(){
        this.title.html("car racing game");
        this.title.position(displayWidth/2-50,0);
        this.input.position(displayWidth/2-40,displayHeight/2-80);
        this.button.position(displayWidth/2+30,displayHeight/2);
        this.reset.position(displayWidth-100, 30);

        this.button.mousePressed(()=>{
            this.button.hide();
            this.input.hide();
            player.name = this.input.value();
            playerCount ++ 
            player.index = playerCount
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Welcome: " + player.name );
            this.greeting.position(displayWidth/2-70,displayHeight/4-50);
            
        })

        this.reset.mousePressed(() =>{
            player.updateCount(0);
            game.update(0);
            database.ref("/").update({
                players:null
            })
        })
    }

}