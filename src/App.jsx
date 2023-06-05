import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ToDo from './components/Todo';
import ToDoForm from './components/ToDoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Criar funcionalidade de adicionar tarefas',
      category: 'Trabalho',
      isCompleted: false,
      isImportant: false,
    },
    {
      id: 2,
      text: 'Ir à academia',
      category: 'Pessoal',
      isCompleted: false,
      isImportant: false,
    },
    {
      id: 3,
      text: 'Estudar React',
      category: 'Estudos',
      isCompleted: false,
      isImportant: false,
    },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Ascendente');

  const addTodo = async (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
      isImportant: false,
    };

    try {
      await axios.post('http://localhost:3000/todos', newTodo);
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const toggleImportant = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className='todo-list'>
        {todos
          .sort((a, b) => {
            if (a.isImportant && !b.isImportant) {
              return -1;
            } else if (!a.isImportant && b.isImportant) {
              return 1;
            } else {
              return 0;
            }
          })
          .filter((todo) =>
            filter === 'All'
              ? true
              : filter === 'Completed'
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <ToDo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
              toggleImportant={toggleImportant}
            />
          ))}
      </div>
      <ToDoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
