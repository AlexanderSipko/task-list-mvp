


export class Observer {

    constructor(initialListener=[]) {
        this.listeners = [...initialListener]
        console.log(this.listeners)
    }

    subscribe(fn) {
        // Проверяем, нет ли уже такой функции
        if (!this.listeners.includes(fn)) {
            this.listeners.push(fn);
        }
        return () => this.unsubscribe(fn);
    }

    unsubscribe(fn) {
        this.listeners = this.listeners.filter((listener) => fn !== listener);
    }

    notify(data) {
        this.listeners.forEach((fn) => fn(data));
    }
}

