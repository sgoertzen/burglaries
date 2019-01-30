class LevelSceneIntro extends TextScene {
    constructor() {
        super({key:"LevelSceneIntro"});
    }

    preload() {
        this.load.image('fairy', 'assets/fairy.png');
        this.load.audio('fairyIntro', 'assets/sound/FairyIntroForge.mp3');
    }

    create() {
        super.create();
        this.showImage('fairy');
       
        this.fairyVoice = this.sound.add('fairyIntro', {loop: false});
        this.fairyVoice.play();
        //this.fairyVoice.once('ended', this.nextScene);

        var line1 = "Oh no!";
        var line2 = "Someone has stolen all of the waffles from the LAN party!";
        var line3 = "Collect the waffles and put a stop to these burglaries.";

        this.time.delayedCall(200, this.displayText, [line1], this);
        this.time.delayedCall(1600, this.displayText, [line2], this);
        this.time.delayedCall(5000, this.displayText, [line3], this);
        this.time.delayedCall(7900, this.nextScene, [], this);
    }

    nextScene () {
        this.scene.start("Level1Scene");
    }
}