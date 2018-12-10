class GameTimer {
    constructor() {
        this.startTime = null;
        this.stopTime = null;
    }

    // Public
    startTimer() {
        this.startTime = window.Date.now();
        this.stopTime = null;
    }

    // Public
    stopTimer() {
        this.stopTime = window.Date.now();
        this._updateBestTime();
    }

    // Public
    getElapsedTimeFormatted() {
        let endTime = this.stopTime || window.Date.now();
        var elapsed = endTime - this.startTime;
        return this._diffAsString(elapsed);
    }

    // Public
    getHighScoreFormatted() {
        let bestTime = this._retreiveBestTime();
        if (bestTime != null) {
            return this._diffAsString(bestTime);
        }
        return "-";
    }

    _updateBestTime() {
        let bestTime = this._retreiveBestTime() || Number.MAX_SAFE_INTEGER;
        let currentTime = this.stopTime - this.startTime;
        if (currentTime < bestTime) {
            localStorage.setItem('highscore', currentTime);
        }
    }
    
    _retreiveBestTime(){
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('highscore');
        return retrievedObject;
    }

    _diffAsString(elapsed) {
        const diff = {};
        diff.minutes = Math.floor(elapsed / 60000);
        diff.seconds = Math.floor(elapsed / 1000 % 60);
        diff.hundreths = Math.floor(elapsed / 100 % 10);
        if (diff.seconds < 10) {
            let message = `${diff.minutes}:0${diff.seconds}.${diff.hundreths}`;
            return message;
        } else {
            let message = `${diff.minutes}:${diff.seconds}.${diff.hundreths}`;
            return message;
        }
    }
}