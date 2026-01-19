
export default class Presenter {
    // интерфейс для модели задач для простоты работы
    constructor(model) {
      this.model = model
    }
  
    async addTask(name) {
      await this.model.addTask(name)
    }
  
    async remote(id) {
      await this.model.remote(id)
    }
  
}