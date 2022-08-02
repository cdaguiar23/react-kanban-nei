import React, { useState } from "react";  
import "./taskitem.css";
import PropTypes from "prop-types";

export default function TaskList({ id, title, taskState, onTaskUpdate, onDeleteTask}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editableTitle, setEditableTitle] = useState(title)

    const onTitleChange = (event) => {
        const newTitle = event.target.value
        setEditableTitle(newTitle)
        onTaskUpdate(id, newTitle, taskState)
    }

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            setIsEditing(false)
            if (editableTitle.length === 0) {
                onDeleteTask(id)
            }
        }
    }

    const onTaskStateChange = (event) => {
        onTaskUpdate(id, title, event.target.value)
    }

    if (isEditing) {
        return (
            <div className="task-item">
                <div 
                type="text" 
                value={editableTitle} 
                onChange={onTitleChange} 
                onKeyPress={onKeyPress}>
                </div>
            </div>
        )
    } else {
        return (
            <div className="task-item">
                <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
                <select onChange={onTaskStateChange} value={taskState}>
                    <option value="Pendente">Pendente</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Completa">Completa</option>
                </select>
            </div>
        )
    }

}

TaskList.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    taskState: PropTypes.func.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
}