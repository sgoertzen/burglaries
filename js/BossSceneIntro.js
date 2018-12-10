class BossSceneIntro extends TextScene {
    constructor() {
        super({key:"BossSceneIntro"});
    }

    preload() {
        this.load.image('demonframe', 'assets/DemonLordFrame.png');
        this.load.audio('bossIntro', 'assets/sound/BossIntro.mp3');
    }

    create() {
        super.create();
        this.showImage('demonframe');
       
        this.bossVoice = this.sound.add('bossIntro', {loop: false});
        this.bossVoice.play();

        var line1 = "Hahaha!";
        var line2 = "I have lured you here to pay for your crimes.";
        var line3 = "You are always taking credit for everyone else's work.  Well no more!";
        var line4 = "Never again will you steal my Play of the Game!";

        this.time.delayedCall(100, this.displayText, [line1], this);
        this.time.delayedCall(2000, this.displayText, [line2], this);
        this.time.delayedCall(6100, this.displayText, [line3], this);
        this.time.delayedCall(11600, this.displayText, [line4], this);
        this.time.delayedCall(16000, this.nextScene, [], this);
    }

    nextScene () {
        this.scene.start("BossSceneIntro2");
    }
}