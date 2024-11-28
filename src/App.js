import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditValue(todos[index]);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSaveEdit = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? editValue : todo));
    setTodos(newTodos);
    setIsEditing(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <div className="dropdown">
                  <button className="dropdown-button">Options ▼</button>
                  <div className="dropdown-content">
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
