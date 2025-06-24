import React from 'react'
import TodoItem from './TodoItem'

const Todos = (props) => {
  return (
    <div className='container my-3'>
      <h3 className='text-center'>Todos List</h3>
        {
            props.todos.length === 0 ? "No Todos to display" :
            props.todos.map((todo) => {
                return (
                <>
                <TodoItem todo={todo} onDelete={props.onDelete} key={todo.sno} onToggleRead={props.onToggleRead}/>
                <hr/>
                </>
                )
            })
        }
       
    </div>
  )
}

export default Todos
