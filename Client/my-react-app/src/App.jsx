import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo"; // Ensure this import stays!

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState(""); // 1. Add the state for the input

  // Keep your existing useEffect to fetch todos
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    };
    getTodos();
  }, []);

  // 2. Add the createNewTodo function here
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const newTodo = await res.json();

      setContent(""); // Clears the input after adding
      setTodos([...todos, newTodo]); // Adds the new todo to the list
    }
  };

  

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>

      {/* 3. Add the form above your list */}
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}
