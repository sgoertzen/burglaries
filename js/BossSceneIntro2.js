class BossSceneIntro2 extends Phaser.Scene {
    constructor() {
        super({key:"BossSceneIntro2"});
    }

    preload() {
    }

    create() {
               
        var lineTitle = "Boss: Demon Lord!"
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var textStyle = { font: "bold 86px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(-200,-200, lineTitle, textStyle);
        this.text = textElement.setOrigin(0.5, 0.5);
        
        var tween = this.tweens.add({
            targets: this.text,
            x: width/2,
            y: height/2,
            duration: 2500,
            ease: "Elastic",
            easeParams: [1.5, 0.5],
        }, this);
        this.time.delayedCall(3500, this.nextScene, [], this);
    }

    nextScene () {
        this.scene.start("BossScene");
    }

}