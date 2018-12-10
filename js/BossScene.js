class BossScene extends LevelParentScene {
    constructor() {
        super({key:"BossScene"});
    }

    preload() {
        super.preload();
        this.load.tilemapTiledJSON("bossmap", "tiled/bosslevel.json");
        this.load.audio('bossmusic', 'assets/sound/Hair-Trigger.mp3');
        this.load.image('treasure', 'assets/Reeses-PB-Cups.png');
        this.load.image('bullet', 'assets/bullet.png')
        this.load.spritesheet('boss', 'assets/DemonLord.png',
            {frameWidth: 200, frameHeight: 200});
    }

    create() {
        super.create("bossmap");

        var width = this.cameras.main.width;

        this.cameras.main.setBounds(0, 0, width, 100);
        this.physics.world.setBounds(0, 0, width, 240);
        
        this.bossmusic = this.sound.add('bossmusic', {loop: "true"});
        this.bossmusic.play();
        
        this.setupBoss(this);
        this.setupGoal(this);
    }

    setupGoal() {
        var goal = this.physics.add.sprite(930, 410, 'treasure');
        goal.body.setAllowGravity(false);
        this.physics.add.collider(goal, this.worldLayer);
        this.physics.add.overlap(this.player, goal, this.goalReached, null, this);
    }

    setupBoss() {
        this.boss = this.physics.add.sprite(730, 320, 'boss');     
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('boss', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.bridgeCollider = this.physics.add.collider(this.boss, this.bridgeLayer);
        this.physics.add.collider(this.boss, this.worldLayer);
        this.physics.add.overlap(this.player, this.boss, this.resetPlayer, null, this);

        this.bulletCount = 0;
        this.bullets = new Phaser.Structs.List();
    }

    addBullet(x, y, angle) {
        var maxSpeed = -300;
        
        let bullet = this.physics.add.sprite(x, y, 'bullet');
        bullet.angle = angle+180;  
        bullet.body.setAllowGravity(false);

        bullet.setVelocityX(maxSpeed * Math.cos(Phaser.Math.DegToRad(angle)));
        bullet.setVelocityY(maxSpeed * Math.sin(Phaser.Math.DegToRad(angle)));

        this.physics.add.overlap(this.player, bullet, this.resetPlayer, null, this);
        return bullet;
    }

    update() {
        super.update();
        this.manageBullets();
    }

    manageBullets(){
        //var maxNumberBullets = 200;
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        
        
        this.bullets.each(function (obj) {
            if (obj.x < 0 || obj.x > width || obj.y < 0 || obj.y > height){
                this.bullets.remove(obj);
                obj.destroy();
            }
        }, this);

        // destroy any bullets off screen
        // add bullets if not at max
        var chance = Phaser.Math.Between(1, 50) == 1;

        if (chance) {// && this.bullets.length < maxNumberBullets) {
            var angle = Phaser.Math.Between(-30, 60);
            this.bullets.add(this.addBullet(680,280,angle));
        }
    }



    goalReached () {
        this.physics.world.removeCollider(this.bridgeCollider);
        this.time.delayedCall(2000, this.nextScene, [], this);
    }

    nextScene () {
        this.bossmusic.stop();
        this.scene.start("EndScene");
    }
}