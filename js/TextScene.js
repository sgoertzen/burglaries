class TextScene extends Phaser.Scene {
    preload() {
    }

    create() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var textStyle = { font: "bold 26px Arial", fill: "#fff", align: 'center', boundsAlignH: "center", boundsAlignV: "middle", width: width };
        this.text = this.add.text(70,90, "", textStyle);
    }

    showImage(name) {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var offset = 50;
        
        var graphics = this.add.graphics(offset, offset);
        graphics.lineStyle(5, 0xFFFFFF, 1.0);
        graphics.fillStyle(0xFFFFFF, 1.0);
        graphics.strokeRect(offset, offset, width-(2*offset), 100);

        this.add.sprite(200, 300, name);
    }

    displayText(line) {
        this.text.text = line;
    }
}