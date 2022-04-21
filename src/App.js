import React, { Fragment, useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("TODOS"));
    return storageJobs ?? [];
  });
  const [todo, setTodo] = useState("");
  const saveRef = useRef({});
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      setError("Task can't be empty");
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complete: false,
      edit: false,
    };
    // let example = JSON.stringify(todos);
    // localStorage.setItem("TODOS", example);
    // setTodos([...todos, newTodo]);
    setTodos(() => {
      const newJobs = [...todos, newTodo];
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("TODOS", jsonJobs);
      setError("");
      return newJobs;
    });

    setTodo("");
  };
  const handleSave = (id) => {
    const updateToDos = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, edit: !todo.edit, text: saveRef.current[id].value }
        : { ...todo };
    });

    if (saveRef.current[id].value === "") {
      setError("Task can't be empty");
      return;
    }
    setTodos(updateToDos);
    const jsonJobs = JSON.stringify(updateToDos);
    localStorage.setItem("TODOS", jsonJobs);
    setError("");
    // console.log("text here:", saveRef.current[id].value);
  };

  const handleDelete = (id) => {
    const updateToDos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updateToDos);
    const jsonJobs = JSON.stringify(updateToDos);
    localStorage.setItem("TODOS", jsonJobs);
  };
  const checkComplete = (id) => {
    const updateToDos = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, complete: !todo.complete }
        : { ...todo };
    });
    setTodos(updateToDos);
    const jsonJobs = JSON.stringify(updateToDos);
    localStorage.setItem("TODOS", jsonJobs);
  };
  const handleEdit = (id) => {
    const updateToDos = todos.map((todo) => {
      return todo.id === id ? { ...todo, edit: !todo.edit } : { ...todo };
    });
    setTodos(updateToDos);
  };
  return (
    <div className="App">
      <div className="content">
        <div className="todo-list">
          <h1>Todos List By Trung Hai</h1>
          {/* FORM ADD  */}
          <form onSubmit={handleSubmit}>
            <div className="cover-form">
              <input
                className="todo-input"
                type="text"
                onChange={(event) => setTodo(event.target.value)}
                value={todo}
              />
              <button className="todo-button" type="submit">
                Add todo
              </button>
            </div>
            {/*+++++++++++++++++++++++ Show ERROR  ******************************/}

            {setError && <span style={{ color: "#fff" }}>{error}</span>}
          </form>

          {/*+++++++++++++++++++++++++++++++++ SHOW ITEM TODO  +++++++++++++++++++++++++++++++++*/}
          <ul className="mt-3">
            {todos.map((todo) => (
              <div className="d-flex item-list my-2" key={todo.id}>
                {!todo.edit ? (
                  <>
                    <li
                      className={todo.complete ? "strike todo-row" : "todo-row"}
                    >
                      {todo.text}
                    </li>
                    <button
                      className="todo-button_edit"
                      onClick={() => handleEdit(todo.id)}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <li
                      className={todo.complete ? "strike todo-row" : "todo-row"}
                    >
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        defaultValue={todo.text}
                        ref={(e) => (saveRef.current[todo.id] = e)}
                        className="input-rename"
                      />
                    </li>
                    <button
                      type="submit"
                      className="todo-button_edit"
                      onClick={() => handleSave(todo.id)}
                    >
                      Save
                    </button>
                  </>
                )}
                {/* BUTTON DELETE  */}
                <button
                  className="todo-button_submit"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
                {/* ************ */}

                {/* CHECK COMPLETE CSS  */}
                <label
                  className="custom-checkbox"
                  tab-index="0"
                  aria-label="Checkbox Label"
                >
                  <input
                    type="checkbox"
                    onChange={() => checkComplete(todo.id)}
                    checked={todo.complete}
                  />
                  <span className="checkmark"></span>
                </label>
                {/* ************ */}
              </div>
            ))}

            {/* ================== */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
