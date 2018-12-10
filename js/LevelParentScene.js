class LevelParentScene extends Phaser.Scene {
    preload() {
        this.load.image("tiles", "assets/spritesheet.png");
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create(mapname) {
        const map = this.make.tilemap({ key: mapname});
        const tileset = map.addTilesetImage("sprites", "tiles");
        this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        this.bridgeLayer = map.createStaticLayer("Bridge", tileset, 0, 0);
        this.worldLayer.setCollisionByProperty({ collision: true });
        this.bridgeLayer.setCollisionByProperty({ collision: true });

        this.setupPlayer(this);
        this.setupKeys(this);
        
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 200, 0);

        this.timer = this.add.text(BANBarrage.constants.WIDTH-150,10, '', { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0);
        this.besttimer = this.add.text(BANBarrage.constants.WIDTH-150,45, `Best: ${this.game.timer.getHighScoreFormatted()}`, { fontSize: '16px', fill: '#FFF' }).setScrollFactor(0);

        // ****** TO SHOW WHAT HAS COLLIDES SET TO TRUE  *******
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
    }

    setupKeys() {
        var cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            key_A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            key_D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            key_W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            key_left: cursors.left,
            key_right: cursors.right,
            key_up: cursors.up,
            key_down: cursors.down,
        }
    }

    setupPlayer() {
        // Setup the player
        this.player = this.physics.add.sprite(100, 380, 'dude');   
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // Don't let player go through the ground
        this.physics.add.collider(this.player, this.worldLayer);
    }

    update(delta) {
        if (this.keys.key_A.isDown || this.keys.key_left.isDown){
            this.moveLeft();
        }
        else if (this.keys.key_D.isDown || this.keys.key_right.isDown)
        {
            this.moveRight();
        }
        else {
            this.stopMovement();
        }
        if ((this.keys.key_W.isDown || this.keys.key_up.isDown) && this.player.body.blocked.down)
        {
            this.player.setVelocityY(BANBarrage.constants.JUMP_VELOCITY);
        }
        if (this.player.y > BANBarrage.constants.HEIGHT) {
            this.resetPlayer();
        }
        this.updateTimer();
    }

    stopMovement() {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    moveLeft() {
        if (this.player.x < 10){
            this.stopMovement();
        }
        else {
            this.player.setVelocityX(-BANBarrage.constants.MOVE_VELOCITY);
            this.player.anims.play('left', true);
        }
    }
    moveRight() {
        if (this.player.x > this.physics.world.bounds.width-10){
            this.stopMovement();
        }
        else {
            this.player.setVelocityX(BANBarrage.constants.MOVE_VELOCITY);
            this.player.anims.play('right', true);
        }
    }

    resetPlayer() {
        this.player.x = 100;
        this.player.y = 380;
    }


    updateTimer() {
        let message = this.game.timer.getElapsedTimeFormatted();
        this.timer.text = message;
    }
}