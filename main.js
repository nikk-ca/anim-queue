export class AnimQueue {
    #req = -1;
    #queue = new Set();

    #callback = (t) => {
        this.#req = -1;
        const q = [...this.#queue];
        this.#queue.clear();
        for (let i=0; i<q.length; i++) q[i](t);
    }

    add(f) {
        this.#queue.add(f);
        if (this.#req === -1) this.#req = window.requestAnimationFrame(this.#callback);
    }

    delete(f) {
        if (this.#queue.delete(f) && this.#queue.size === 0) {
            window.cancelAnimationFrame(this.#req);
            this.#req = -1;
        }
    }
}
