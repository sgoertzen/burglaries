class LevelSceneIntro extends TextScene {
    constructor() {
        super({key:"LevelSceneIntro"});
    }

    preload() {
        this.load.image('fairy', 'assets/fairy.png');
        this.load.audio('fairyIntro', 'assets/sound/FairyIntro.mp3');
    }

    create() {
        super.create();
        this.showImage('fairy');
       
        this.fairyVoice = this.sound.add('fairyIntro', {loop: false});
        this.fairyVoice.play();
        //this.fairyVoice.once('ended', this.nextScene);

        var line1 = "Oh no!";
        var line2 = "Someone has stolen all of the Reese cups from the LAN party!";
        var line3 = "Please find the Reese's and put a stop to these burglaries.";

        this.time.delayedCall(700, this.displayText, [line1], this);
        this.time.delayedCall(2000, this.displayText, [line2], this);
        this.time.delayedCall(5600, this.displayText, [line3], this);
        this.time.delayedCall(10000, this.nextScene, [], this);
    }

    nextScene () {
        this.scene.start("Level1Scene");
    }
}