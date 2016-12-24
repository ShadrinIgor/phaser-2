var game = new Phaser.Game(500, 500, Phaser.AUTO, '#game', { preload: preload, create: create, update: update });

var button1;
var button2;
var button1Status = 0; // -1 - disable, 0 - active, 1 - selected
var button2Status = -1;

function preload() {
    game.load.spritesheet('button', 'assets/buttons1.png', 108, 67);
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    button1 = game.add.sprite(100, 100, 'button');
    button1.frame = 0;
    button1.inputEnabled = true;
    button1.events.onInputDown.add(clickDown, this);
    button1.events.onInputUp.add(clickUp, this);

    button2 = game.add.sprite(207, 100, 'button');
    button2.frame = 3;
    button2.inputEnabled = true;
    button2.events.onInputDown.add(clickDown2, this);
    button2.events.onInputUp.add(clickUp2, this);

    game.input.mouse.capture = true;
}

function update() {

    if( button1.frame == 0 || button1.frame == 1 ) {
        if (button1.input.pointerOver()) {
            if (button1Status == 0)button1.frame = 1;
        }
        else {
            if (button1Status == 0) button1.frame = 0;
        }
    }

    if( button2.frame == 0 || button2.frame == 1 ){
        if (button2.input.pointerOver()) {
            if( button2Status == 0 )button2.frame = 1;
        }
        else {
            if( button2Status == 0 ) button2.frame = 0;
        }
    }

}

function clickDown( sprite, pointer ) {
    sprite.frame += 4;
    if( button1Status == 0 )button1Status = 1;
    else if( button1Status == 1 )button1Status = 0;
}

function clickUp( sprite, pointer ) {
    if( button1Status == 1 ) {
        button1.frame = 2;
        button2.frame = 0;
        button2Status = 0;
    } else if( button1Status == 0 ) {
        button1.frame = 0;
        button2.frame = 3;
        button2Status = -1;
    } else button1.frame = 3;
}

function clickDown2( sprite, pointer ) {
    sprite.frame += 4;
    if( button2Status == 0 )button2Status = 1;
    else if( button2Status == 1 )button2Status = 0;
}

function clickUp2( sprite, pointer ) {

    if( button2Status == 1 ) {
        button2.frame = 2;
        button1.frame = 3;
        button1Status = -1;
    } else if( button2Status == 0 ) {
        button2.frame = 0;
        button1.frame = 2;
        button1Status = 1;
    } else button2.frame = 3;
}