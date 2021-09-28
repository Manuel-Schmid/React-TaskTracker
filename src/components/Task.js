import { FaTimes } from "react-icons/fa";

const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'Reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}> {/* if the reminder is true, add the class 'reminder'*/}
            <h3>
                {task.text}
                <FaTimes style={{ color: 'red', cursor: 'Pointer'}} onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
