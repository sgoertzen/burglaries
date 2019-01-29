class BossSceneIntro extends TextScene {
    constructor() {
        super({key:"BossSceneIntro"});
    }

    preload() {
        this.load.image('demonframe', 'assets/DemonLordFrame.png');
        this.load.audio('bossIntro', 'assets/sound/BossIntroForge.mp3');
    }

    create() {
        super.create();
        this.showImage('demonframe');
       
        this.bossVoice = this.sound.add('bossIntro', {loop: false});
        this.bossVoice.play();

        var line1 = "You think you ForgeLAN breakfast is saved?";
        var line2 = "You may have gotten the waffles but the bacon is all mine!";

        this.time.delayedCall(100, this.displayText, [line1], this);
        this.time.delayedCall(3000, this.displayText, [line2], this);
        this.time.delayedCall(7500, this.nextScene, [], this);
    }

    nextScene () {
        this.scene.start("BossSceneIntro2");
    }
}