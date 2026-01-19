


export class CompositeObserver {
    
    constructor() {
        this.listeners = this.listeners = new Map();
        console.log(this.listeners)
    }

    subscribe(key, f) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set())
        }
        this.listeners.get(key).add(f)

        return () => this.unsubscribe(key, f)
    }

    unsubscribe(key, f) {
        if (this.listeners.has(key)) {
            this.listeners.get(key).delete(f)
        }
        if (this.listeners.get(key).size === 0) {
            this.listeners.delete(key)
        }
    }

    notify(key, data) {
        console.log(key)
        if (this.listeners.has(key)) {
            this.listeners.get(key).forEach(fn => {
                try {
                    fn(data);
                } catch (error) {
                    console.error(`Error in listener for key "${key}":`, error);
                }
            });
        }
    }
}

