import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
    const [tasks, setTasks] = useState([ // initial state, change would be made with 'setTasks()'
        {
            id: 1,
            text: 'Meeting 1',
            day: '27.07.2021',
            reminder: true
        },
        {
            id: 2,
            text: 'Meeting 2',
            day: '28.07.2021',
            reminder: true
        },
        {
            id: 3,
            text: 'Meeting 3',
            day: '29.07.2021',
            reminder: true
        },
    ])

    // Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }

    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) =>
            task.id === id
                ? { ...task, reminder: !task.reminder } // returns the same task as before but changes the reminder to the opposite
                : task // returns the normal task
        ))
    }


    return (
        <div className="container">
            <Header />
            <AddTask onAdd={addTask}/>
            { (tasks.length > 0)
                ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> // if there is more than 0 tasks show the Task-list
                : 'No Tasks To Show' // else show nothing
            }
        </div>
    )
}

export default App