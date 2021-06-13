class SimpleDebug {
    constructor() {
        this.debugOn = true;
        this.debugDepth = 5;
    }

    log(message, debugDepth = 5) {
        if (!this.debugOn) return;
        if (debugDepth > this.debugDepth) return;
        if (this.debugOn) {
            console.log(message);
        }
    }

    setLevel(newLevel) {
        this.debugDepth = newLevel;
    }
}

let logger = new SimpleDebug();

export default logger;