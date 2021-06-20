export class AnimQueue {
    _req = -1;
    _queue = new Set();

    _callback = (t) => {
        this._req = -1;
        const q = [...this._queue];
        this._queue.clear();
        for (let i=0; i<q.length; i++) q[i](t);
    }

    add(f) {
        this._queue.add(f);
        if (this._req === -1) this._req = window.requestAnimationFrame(this._callback);
    }

    delete(f) {
        this._queue.delete(f);
        if (this._queue.size === 0) {
            window.cancelAnimationFrame(this._req);
            this._req = -1;
        }
    }
}
