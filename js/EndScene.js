class EndScene extends Phaser.Scene {
    constructor() {
        super({key:"EndScene"});
    }

    preload() {
        this.load.audio('victorymusic', 'assets/sound/Ultimate-Victory.mp3');
    }

    create() {
        this.game.timer.stopTimer();
        this.victoryMusic = this.sound.add('victorymusic', {loop: "true"});
        this.victoryMusic.play();

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var titleStyle = { font: "bold 50px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(width/2,height/2-150, 'You won!', titleStyle);
        textElement.setOrigin(0.5, 0.5);

        var infoStyle = { font: "bold 26px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(width/2,height/2-40, `Run time: ${this.game.timer.getElapsedTimeFormatted()}`, infoStyle);
        textElement.setOrigin(0.5, 0.5);

        var textElement = this.add.text(width/2,height/2+20, `Best time: ${this.game.timer.getHighScoreFormatted()}`, infoStyle);
        textElement.setOrigin(0.5, 0.5);
        
        setTimeout(() => {
            var textElement = this.add.text(width/2,height/2+180, 'Press any key to try again', infoStyle);
            textElement.setOrigin(0.5, 0.5);
    
            this.input.on('pointerdown', this.inputDetected, this);
            this.input.keyboard.on('keydown', this.inputDetected, this);    
        }, 1000, this);
    }

    inputDetected (event) {
        this.victoryMusic.stop();
        this.scene.start("Level1Scene");
    }
}