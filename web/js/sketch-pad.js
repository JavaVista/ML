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

        const lineBreak = document.createElement('br');
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement('button');
        this.undoBtn.innerText = 'Undo';
        container.appendChild(this.undoBtn);
        this.undoBtn.disabled = true;

        this.ctx = this.canvas.getContext('2d');

        this.paths = [];
        this.isDrawing = false;

        // hashtag in the method indicates a private method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = e => {
            const mouse = this.#getMouse(e);
            this.paths.push([mouse]);
            this.isDrawing = true;
        };

        this.canvas.onmousemove = e => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(e);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                this.#redraw();
            }
        };

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        };
        // to make mobile work with eventlisteners on first touch
        this.canvas.ontouchstart = e => {
            const loc = e.touches[0];
            this.canvas.onmousedown(loc);
        };

        this.canvas.ontouchmove = e => {
            const loc = e.touches[0];
            this.canvas.onmousemove(loc);
        };

        this.canvas.ontouchend = () => {
            this.canvas.onmouseup();
        };
        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
        if(this.paths.length > 0) {
            this.undoBtn.disabled = false;
        } else {
            this.undoBtn.disabled = true;
        }
    }

    #getMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouse = [
            Math.round(e.clientX - rect.left),
            Math.round(e.clientY - rect.top),
        ];
        return mouse;
    }
}
