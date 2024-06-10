
const fadeBtn = document.querySelector('.burger')
const fade = document.querySelector('.fade')
const closeFade = document.querySelector('#cross')
const backdrop = document.querySelector('.backdrop')

fadeBtn.onclick = () => {
    fade.classList.add('fade_active')
    backdrop.classList.add('backdrop_active')
}

closeFade.onclick = () => {
    fade.classList.remove('fade_active')
    backdrop.classList.remove('backdrop_active')
}

const categoryForm = document.forms['categories']
const todoForm = document.forms['todos']
const categorySelect = document.getElementById('categs')
const todoContainer = document.getElementById('todo-container')

const categories = []
const categoryTasks = {}

categoryForm.onsubmit = (e) => {
    e.preventDefault()
    const categoryTitle = categoryForm.title.value
    if (categoryTitle && !categories.includes(categoryTitle)) {
        categories.push(categoryTitle)
        categoryTasks[categoryTitle] = []
        reloadCategories(categoryTitle, categorySelect)
        setCategories(categoryTitle, todoContainer)
        categoryForm.reset()
    }
};

todoForm.onsubmit = (e) => {
    e.preventDefault()
    const todoTitle = todoForm.title.value
    const todoDescription = todoForm.description.value
    const todoDeadline = todoForm.deadline.value
    const todoCategory = todoForm.category.value

    if (todoTitle && todoDescription && todoDeadline && todoCategory) {
        if (!categoryTasks[todoCategory]) {
            categoryTasks[todoCategory] = []
        }
        categoryTasks[todoCategory].push({
            title: todoTitle,
            description: todoDescription,
            deadline: todoDeadline,
        })
        reloadTodos(todoContainer)
        todoForm.reset()
        tasksCount()
    }
};

function reloadCategories(category, place) {
    const option = document.createElement('option')
    option.value = category
    option.innerHTML = category
    place.append(option)
}

function setCategories(categoryTitle, place) {
    const categoryDiv = document.createElement("div")
    const categoryHead = document.createElement("div")
    const categoryHthree = document.createElement("h3")
    const categoryAmountSpan = document.createElement("span")
    const categoryBox = document.createElement("div")

    categoryDiv.classList.add("category")
    categoryDiv.id = `category-${categoryTitle}`
    categoryHead.classList.add("tasks-head")
    categoryHthree.classList.add("todo-title-head")
    categoryAmountSpan.classList.add("tasks-amount")
    categoryBox.classList.add("tasks-box")

    categoryHthree.innerHTML = categoryTitle
    categoryAmountSpan.innerHTML = "0"

    categoryHead.append(categoryHthree, categoryAmountSpan)
    categoryDiv.append(categoryHead, categoryBox)
    place.append(categoryDiv)
}

function reloadTodos(place) {
    place.innerHTML = '';
    categories.forEach((item) => {
        setCategories(item, place)
        const categoryTaskList = document.getElementById(`category-${item}`).querySelector('.tasks-box')
        console.log(categoryTaskList);
        categoryTasks[item].forEach((task) => {
            const taskDiv = document.createElement('div')
            taskDiv.classList.add('task')

            const isDoneCheckbox = document.createElement('input')
            isDoneCheckbox.type = 'checkbox'
            isDoneCheckbox.classList.add('do')

            isDoneCheckbox.onclick = () => {
                taskTitle.classList.toggle('completed', isDoneCheckbox.checked)
            }

            const taskInfo = document.createElement('div')
            taskInfo.classList.add('task-info')

            const taskTitle = document.createElement('h4')
            taskTitle.classList.add('task-title')
            taskTitle.innerHTML = task.title

            const dueTo = document.createElement('p')
            dueTo.classList.add('due-to')
            dueTo.innerHTML = `Due: ${task.deadline}`

            const changeDiv = document.createElement('div')
            changeDiv.classList.add('change')
            const changeImg = document.createElement('img')
            changeImg.classList.add('change-img')
            changeImg.src = './img/change.svg'
            changeImg.alt = 'change'
            changeDiv.append(changeImg)

            changeDiv.onclick = () => {
                const newTitle = prompt("изменить")
                if (newTitle) {
                    task.title = newTitle
                    taskTitle.innerHTML = newTitle
                }
            }
            
            const deleteDiv = document.createElement('div')
            deleteDiv.classList.add('delete')
            const deleteImg = document.createElement('img')
            deleteImg.classList.add('delete-img')
            deleteImg.src = './img/delete.svg'
            deleteImg.alt = 'delete'
            deleteDiv.append(deleteImg)

            deleteDiv.onclick = () => {
                const categoryTasksArr = categoryTasks[item]
                const taskIndex = categoryTasksArr.indexOf(task)
                if (taskIndex >= 0) {
                    categoryTasksArr.splice(taskIndex, 1)
                    reloadTodos(place)
                }
            }

            taskInfo.append(taskTitle, dueTo)
            taskDiv.append(isDoneCheckbox, taskInfo, changeDiv, deleteDiv)
            categoryTaskList.append(taskDiv)
        })
    })
    tasksCount()
}

function tasksCount() {
    const categories = document.querySelectorAll('.category')
    categories.forEach(category => {
        const tasksCount = category.querySelectorAll('.task').length
        const amountChecer = category.querySelector('.tasks-amount')
        amountChecer.innerHTML = tasksCount
    })
}
