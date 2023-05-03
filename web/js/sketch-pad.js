class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
    `;
        container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        // hashtag in the method indicates it is a private method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = e => {
            const rect = this.canvas.getBoundingClientRect();
            const mouse = [
                Math.round(e.clientX - rect.left),
                Math.round(e.clientY - rect.top)];
        };
    }
}
