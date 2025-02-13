import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './todos.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async () => {
        if (!newTodo.title.trim() || !newTodo.description.trim()) {
            alert("Title and description cannot be empty!");
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/todos/', { ...newTodo, completed: false });
            setNewTodo({ title: '', description: '' });
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/todos/${id}/`, { completed: !completed });
            fetchTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className="todo-container">
            <h1>📝 Todo List</h1>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Enter Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                />
                <button className="add-btn" onClick={addTodo}>Add Task</button>
            </div>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <div className="todo-text">
                            <h2>{todo.title}</h2>
                            <p>{todo.description}</p>
                            <small>Created at: {new Date(todo.created_at).toLocaleString()}</small>
                        </div>
                        <button className="toggle-btn" onClick={() => toggleComplete(todo.id, todo.completed)}>
                            {todo.completed ? '✅' : '🔲'}
                        </button>
                        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './todos.css';

// const Todo = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState({ title: '', description: '' });

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/todos/');
//             setTodos(response.data);
//         } catch (error) {
//             console.error("Error fetching todos:", error);
//         }
//     };

//     const addTodo = async () => {
//         if (!newTodo.title.trim() || !newTodo.description.trim()) {
//             alert("Title and description cannot be empty!");
//             return;
//         }
//         try {
//             await axios.post('http://127.0.0.1:8000/api/todos/', newTodo);
//             setNewTodo({ title: '', description: '' });
//             fetchTodos();
//         } catch (error) {
//             console.error("Error adding todo:", error);
//         }
//     };

//     const deleteTodo = async (id) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error deleting todo:", error);
//         }
//     };

//     return (
//         <div className="todo-container">
//             <h1>📝 Todo List</h1>

//             <div className="input-container">
//                 <input
//                     type="text"
//                     placeholder="Enter Title"
//                     value={newTodo.title}
//                     onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Enter Description"
//                     value={newTodo.description}
//                     onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
//                 />
//                 <button className="add-btn" onClick={addTodo}>Add Task</button>
//             </div>

//             <ul className="todo-list">
//                 {todos.map(todo => (
//                     <li key={todo.id} className="todo-item">
//                         <div className="todo-text">
//                             <h2>{todo.title}</h2>
//                             <p>{todo.description}</p>
//                         </div>
//                         <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>❌</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Todo;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './todos.css'


// const Todo = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState({ title: '', description: '' });

//     useEffect(() => {
//         fetchTodos();
//     }, []); // Dependency array ensures it runs once

//     const fetchTodos = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/todos/');
//             setTodos(response.data);
//         } catch (error) {
//             console.error("Error fetching todos:", error);
//         }
//     };

//     const addTodo = async () => {
//         try {
//             await axios.post('http://127.0.0.1:8000/api/todos/', newTodo);
//             setNewTodo({ title: '', description: '' }); // Reset input fields
//             fetchTodos();
//         } catch (error) {
//             console.error("Error adding todo:", error);
//         }
//     };

//     const deleteTodo = async (id) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
//             fetchTodos();
//         } catch (error) {
//             console.error("Error deleting todo:", error);
//         }
//     };

//     return (
//         <div>
//            <div className="container">
//     <h1>Todo List</h1>
//     {/* Your JSX code here */}
// </div>

//             <input 
//                 type="text" 
//                 placeholder="Title" 
//                 value={newTodo.title} 
//                 onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} 
//             />
//             <input 
//                 type="text" 
//                 placeholder="Description" 
//                 value={newTodo.description} 
//                 onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} 
//             />
//             <button onClick={addTodo}>Add Todo</button>
//             <ul>
//                 {todos.map(todo => (
//                     <li key={todo.id}>
//                         <h2>{todo.title}</h2>
//                         <p>{todo.description}</p>
//                         <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Todo;









// import { useEffect } from "react"
// import React {useState,useEffect} from 'react';


// const Todo = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState({title:'',description:''});

//     useEffect(()=>{
//         fetchTodos();
//     },[]);

//     const fetchTodos = async () => {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         setTodos(response.data);
//     };
//     const addTodo = async () => {
//         await axios.post('',newTodo);
//         setNewTodo({title:'',description:''});
//         fetchTodos();
//     };

//     const deleteTodo =async(id) => {
//         await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
//         fetchTodos();
//     };

//     return(
//         <div>
//             <h1>Todo App</h1>
//             <div>
//                 <input type="text" value={newTodo.title} onChange={(e)=>setNewTodo
//             </div>
//         </div>

//     )


