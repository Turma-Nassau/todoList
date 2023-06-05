import React from 'react';

const Todo = ({ todo, removeTodo, completeTodo, toggleImportant }) => {
  return (
    <div className='todo' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      <div className='content'>
        <p>{todo.text}</p>
        <p className='category'>({todo.category})</p>
      </div>
      <div>
        <button className='complete' onClick={() => completeTodo(todo.id)}>
          {todo.isCompleted ? 'Desmarcar' : 'Finalizar'}
        </button>
        <button className='remove' onClick={() => removeTodo(todo.id)}>
          X
        </button>
        <button className='important' onClick={() => toggleImportant(todo.id)}>
          {todo.isImportant ? 'Desmarcar' : 'Importante'}
        </button>
      </div>
    </div>
  );
};

export default Todo;
