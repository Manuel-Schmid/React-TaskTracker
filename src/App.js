import {useEffect, useState} from "react"; // hooks
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

/* running the App:
 Terminal 1: npm run server
 Terminal 2: npm start
*/

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]) // initial state, change would be made with 'setTasks()'

    useEffect(() => { // is run instantly when the site is loaded
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // fetch Data (tasks) from json-server
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        return await res.json()
    }

    // Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data]) // adds the 'data'-task to the existing tasks-array

        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
    }

    // Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { // creates a fetch request, the method of which
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT', // 'PUT' means 'update'
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
            task.id === id
                ? { ...task, reminder: data.reminder } // returns the same task as before but changes the reminder to the opposite
                : task // returns the normal task
        ))
    }

    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showForm={showAddTask}/> {/*if button is clicked either show or hide the form*/}

                <Route path='/' exact render={(props) => (
                    <>
                        { showAddTask && <AddTask onAdd={addTask}/> } {/*short way of writing ternary without an 'else'*/}
                        { (tasks.length > 0)
                            ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> // if there is more than 0 tasks show the Task-list
                            : 'No Tasks To Show' // else show nothing
                        }
                    </>
                )}/>
                <Route path='/about' component={About}/>
                <Footer />
            </div>
        </Router>
    )
}

export default App