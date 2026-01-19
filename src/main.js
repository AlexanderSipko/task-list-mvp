import View from './features/view'
import TaskModel from './features/model'
import Presenter from './features/presenter.js'

const initialSubscriber = (tasks) => {
  console.log('можно подписаться в момент инициализации:', tasks.length);
};

function main() {
  const model = new TaskModel([], )
  const presenter = new Presenter(model)
  const view = new View(presenter)

  model.subscribe('tasks', initialSubscriber)
  model.subscribe('tasks', (data) => view.renderList(data))
  model.subscribe('count', (data) => view.showCount(data))
}

main()