class TitleScene extends Phaser.Scene {
    constructor() {
        super({key:"TitleScene"});
    }

    preload() {
        this.game.timer = new GameTimer();
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        var textStyle = { font: "bold 60px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(width/2,height/2-150, 'BAN LAN Burglaries!', textStyle);
        textElement.setOrigin(0.5, 0.5);
        
        var textStyle = { font: "bold 26px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(width/2,height/2-60, 'Directions: WASD or arrow keys to move', textStyle);
        textElement.setOrigin(0.5, 0.5);

        var progressBarHeight = height / 2 + 30;

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(width / 2 - 160, progressBarHeight + 20, 320, 50);
        
        this.loadingText = this.make.text({
            x: width / 2,
            y: progressBarHeight,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        this.loadingText.setOrigin(0.5, 0.5);
        
        this.percentText = this.make.text({
            x: width / 2,
            y: progressBarHeight + 45,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.percentText.setOrigin(0.5, 0.5);
        
        this.assetText = this.make.text({
            x: width / 2,
            y: progressBarHeight + 100,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            this.percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(width / 2 - 150, progressBarHeight + 30, 300 * value, 30);
        }, this);
        
        this.load.on('fileprogress', function (file) {
            this.assetText.setText('Loading asset: ' + file.key);
        }, this);

        this.load.on('complete', this.loadComplete, this);
        
        
        // Music
        this.load.audio('bossIntro', 'assets/sound/BossIntro.mp3');
        this.load.audio('bossmusic', 'assets/sound/Hair-Trigger.mp3');
        this.load.audio('fairyIntro', 'assets/sound/FairyIntro.mp3');
        this.load.audio('levelmusic', 'assets/sound/Written-in-the-Genes.mp3');
        this.load.audio('victorymusic', 'assets/sound/Ultimate-Victory.mp3');
                
        // Images
        this.load.image('demonframe', 'assets/DemonLordFrame.png');
        this.load.image('fairy', 'assets/fairy.png');
        this.load.image('goal', 'assets/reese_package.png');
        this.load.image("tiles", "assets/spritesheet.png");
        this.load.image('treasure', 'assets/Reeses-PB-Cups.png');
        this.load.tilemapTiledJSON("bossmap", "tiled/bosslevel.json");
        this.load.tilemapTiledJSON("map", "tiled/mainlevel.json");
        
        // Spritesheets
        this.load.spritesheet('boss', 'assets/DemonLord.png',
            {frameWidth: 200, frameHeight: 200});
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    loadComplete() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.loadingText.setText('Loading complete');
        this.assetText.destroy();
        
        var textStyle = { font: "bold 26px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        var textElement = this.add.text(width/2,height/2+150, 'Press any key to start!', textStyle);
        textElement.setOrigin(0.5, 0.5);
        
        this.input.on('pointerdown', this.inputDetected, this);
        this.input.keyboard.on('keydown', this.inputDetected, this);
    }

    create() {
    }

    inputDetected (event) {
        //this.scene.start("BossScene");
        this.scene.start("LevelSceneIntro");
        //this.scene.start("Level1Scene");
        //this.scene.start("BossSceneIntro");
    }
}
