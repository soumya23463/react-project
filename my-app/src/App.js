import './App.css';
import Footer from './MyComponents/Footer';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  // Load todos from localStorage on first render
  const initialTodos = () => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  };

  const [todos, setTodos] = useState(initialTodos);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Delete a todo
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  // Add a new todo
  const addTodo = (title, desc) => {
    const sno = todos.length ? todos[todos.length - 1].sno + 1 : 1;
    const newTodo = { sno, title, desc };
    setTodos([...todos, newTodo]);
  };

  const markRead = (todo) => {
    setTodos(
      todos.map((item) =>
        item.sno === todo.sno ? { ...item, read: !item.read } : item
      )
    );
  };
  return (
    <Router>
      <Header title="My Todos List" />

     
      <Switch>
        <Route exact path="/">
          <AddTodo addTodo={addTodo} />
          <Todos todos={todos} onDelete={onDelete} onToggleRead={markRead}/>
        </Route>

        <Route path="/about">
          <About />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
