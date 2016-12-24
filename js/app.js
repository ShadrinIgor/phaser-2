var game = new Phaser.Game(800, 500, Phaser.AUTO, '#game', { preload: preload, create: create, update: update });

var button1;
var button2;
var button1Status = 0; // -1 - disable, 0 - active, 1 - selected
var button2Status = -1;
var buttonSoundStatus = 0;
var buttonSizeStatus = 0;
var logoStatus = 0;

function preload() {
    game.load.spritesheet('button', 'assets/buttons1.png', 108, 67);
    game.load.spritesheet('button2', 'assets/buttons2.png', 54, 44);
    game.load.audio('sound', ['assets/click.mp3']);
    game.load.spritesheet('logo', 'assets/logo.png', 477, 378);
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    music = game.add.audio('sound');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    button1 = game.add.sprite(50, 100, 'button');
    button1.frame = 0;
    button1.inputEnabled = true;
    button1.events.onInputDown.add(clickDown, this);
    button1.events.onInputUp.add(clickUp, this);

    button2 = game.add.sprite(157, 100, 'button');
    button2.frame = 3;
    button2.inputEnabled = true;
    button2.events.onInputDown.add(clickDown2, this);
    button2.events.onInputUp.add(clickUp2, this);

    buttonSound = game.add.sprite(50, 200, 'button2');
    buttonSound.inputEnabled = true;
    buttonSound.events.onInputUp.add(clickButtonSound, this);
    buttonSize = game.add.sprite(150, 200, 'button2');
    buttonSize.inputEnabled = true;
    buttonSize.events.onInputUp.add(clickButtonSize, this);
    buttonSize.frame = 4;

    logo = game.add.sprite(300, 0, 'logo');
    logo.frame = 0;
    logo.alpha = 1;

    game.input.mouse.capture = true;
}

function update() {

    if( logoStatus == 0 && ( logo.alpha == 0 || logo.alpha == 1 ) ){
        logoStatus = 1;
        if( logo.alpha == 0 ){
            if( logo.frame < 9 )logo.frame++;
                else logo.frame = 0;
        }
        var tween = game.add.tween(logo).to( { alpha: ( logo.alpha == 0 ? 1 : 0 ) }, 1000, "Linear", true);
        tween.onComplete.add(function () {
            logoStatus = 0;
        }, this);
    }

    if (buttonSound.input.pointerOver()) {
        if( buttonSound.frame == 0 )buttonSound.frame = 1;
        if( buttonSound.frame == 2 )buttonSound.frame = 3;
    } else  {
        if( buttonSoundStatus == 0 )buttonSound.frame = 0;
        if( buttonSoundStatus == 1 )buttonSound.frame = 2;
    }

    if (buttonSize.input.pointerOver()) {
        if( buttonSize.frame == 4 )buttonSize.frame = 5;
        if( buttonSize.frame == 6 )buttonSize.frame = 7;
    } else  {
        if( buttonSizeStatus == 0 )buttonSize.frame = 4;
        if( buttonSizeStatus == 1 )buttonSize.frame = 6;
    }

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
        if( buttonSoundStatus == 0 )music.play();
        button1.frame = 2;
        button2.frame = 0;
        button2Status = 0;
    } else if( button1Status == 0 ) {
        if( buttonSoundStatus == 0 )music.play();
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
        if( buttonSoundStatus == 0 )music.play();
        button2.frame = 2;
        button1.frame = 3;
        button1Status = -1;
    } else if( button2Status == 0 ) {
        if( buttonSoundStatus == 0 )music.play();
        button2.frame = 0;
        button1.frame = 2;
        button1Status = 1;
    } else button2.frame = 3;
}

function clickButtonSound( sprite, pointer ) {
    if( buttonSoundStatus == 0 ) {
        buttonSoundStatus = 1;
        buttonSound.frame = 2;
    } else {
        buttonSoundStatus = 0;
        buttonSound.frame = 0;
    }
}

function clickButtonSize( sprite, pointer ) {
    if( buttonSizeStatus == 0 ) {
        buttonSizeStatus = 1;
        buttonSize.frame = 6;
        game.scale.startFullScreen(false);
    } else {
        buttonSizeStatus = 0;
        buttonSize.frame = 4;
        game.scale.stopFullScreen();

    }
}