class Level1Scene extends LevelParentScene {
    constructor() {
        super({key:"Level1Scene"});
    }

    preload() {
        super.preload();
        this.load.tilemapTiledJSON("map", "tiled/mainlevel.json");
        this.load.audio('levelmusic', 'assets/sound/Written-in-the-Genes.mp3');
        this.load.image('goal', 'assets/waffle.png');
    }

    create() {
        super.create("map");
        this.game.timer.startTimer();

        this.cameras.main.setBounds(0, 0, 4800, 100);
        this.physics.world.setBounds(0, 0, 4800, 240);
        
        this.levelmusic = this.sound.add('levelmusic', {loop: "true"});
        this.levelmusic.play();
        
        this.setupStars();
    }

    setupStars() {
        this.totalStars = 0;
        this.addstar(340,100);
        this.addstar(860,380);
        this.addstar(2000,150);
        this.addstar(3000,100);
        this.addstar(3460,380);
        this.addstar(4200,140);
        this.addstar(4640,380);
    }

    addstar(x,y) {
        this.totalStars++;
        var star = this.physics.add.sprite(x, y, 'goal');
        star.body.setAllowGravity(false);
        this.physics.add.collider(star, this.worldLayer);
        this.physics.add.overlap(this.player, star, this.starReached, null, this);
    }  

    update() {
        super.update();
    }

    starReached (player, star) {
        star.destroy();
        this.totalStars--;
        if (this.totalStars == 0){
            this.levelmusic.stop();
            this.scene.start("BossSceneIntro");
        }
    }
}