
class InputButton {

    constructor(handlerAddTask) {
        this.handlerAddTask = handlerAddTask
        this.form = document.getElementById("task-form")
        this.input = document.getElementById("task-input")
        this.bind()
    }

    bind() {
        this._addButtonListener()
    }

    _addButtonListener() {
        this.form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const inputValue = this.input.value.trim();
            if (inputValue) {
              try {
                await this.handlerAddTask(inputValue);
                this.input.value = "";
              } catch {
                alert("Не удалось добавить задачу");
              }
            }
          });
    }

}

class listElement {
    // отрисовка списка элементов все других задач нет
    constructor(handlerRemote) {
        this.handlerRemote = handlerRemote
        this.ul = document.getElementById('task-list')
    }

    render(tasks) {
      this.ul.innerHTML = ''
      tasks.forEach(task => {
        const li = this._createLi(task.name, task.id)
        this.ul.appendChild(li)
      })
    }

    _createLi(name, id) {
        const li = document.createElement('li');
        const remoteSpan = document.createElement('span');
        const innerSpan = document.createElement('span');

        // определяем классы
        li.classList.add('task-item')
        remoteSpan.classList.add('remove-btn');

        innerSpan.textContent = name;
        remoteSpan.id = id;
        remoteSpan.textContent = '×';

        remoteSpan.addEventListener('click', () => this.handlerRemote(id))

        li.append(innerSpan, remoteSpan);
        
        return li;
    }

}

const showCountTasks = (count) => {
  let p = document.getElementById('count-tasks')
  p.innerText = count ? `кол-во задач: ${count}`: `задач пока нет`
}
  
export default class View {
    // фасад для UI берет только то что ему нужно не более
    constructor(presenter) {
      this.listElement = new listElement((v) => presenter.remote(v))
      this.inputElement = new InputButton((v) => presenter.addTask(v))
      this.showCountTask = showCountTasks
    }

    renderList(tasks) {
      this.listElement.render(tasks)
    }

    showCount(count) {
      this.showCountTask(count)
    }
}