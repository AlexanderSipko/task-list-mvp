import { CompositeObserver } from "../share/compositeObserver";

export default class TaskModel extends CompositeObserver {
    // основной компонент модель его задача создавать и удалять задачи
    // хранить значение и оповещать подписчиков о изменениях

    constructor(initialTasks=[], initialListener=[]) {
        super(initialListener)
        this.tasks = [...initialTasks];
        this.count = this.tasks.length
    }

    generateId() {
        // Более надежный вариант
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addTask(name) {
        const newID = this.generateId();
        this.tasks.push({
        id: newID,
        name: name
      })
      this.count = this.tasks.length
      this.bindNotify('tasks')
      this.bindNotify('count')
    }
  
    remote(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.count = this.tasks.length
      this.bindNotify('tasks')
      this.bindNotify('count')
    }
  
    bindNotify(key) {
        switch(key) {
            case 'tasks':
                this.notify(key, this.tasks)
                break
            case 'count':
                this.notify(key, this.count)
                break
            default:
                console.log("Error нет ключа", key)
        }
        

    }

  }
  