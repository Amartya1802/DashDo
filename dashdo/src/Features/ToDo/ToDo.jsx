import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "./Task";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { fetchTodos, selectTodo } from "./TodoSlice";
import { addTodo } from "./TodoSlice";

function Todo() {
  const [task, setTask] = useState("");

  const todos = useSelector(selectTodo);
  // const [todos_bypaas, setTodos_bypaas] = useState([])
  const dispatch = useDispatch();
  const dispatchRef = useRef(dispatch);

  const addNewTask = () => {
    if (!task) {
      return;
    }
    let newTask = { id: Date.now().toString(), task, complete: false };
    setTask("");
    dispatch(addTodo(newTask));
  };

  useEffect(() => {
    dispatchRef.current(fetchTodos());
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatchRef.current(fetchTodos());
      }
    });
  }, [dispatchRef]);

  // useEffect(()=>{
  //   const temp_arr = fetchTodos()
  //   setTodos_bypaas(temp_arr);
  //   console.log(todos_bypaas);
  // },[])

  
  return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-2">
          <input
            value={task}
            onChange={(event) => setTask(event.target.value)}
            type="text"
            className="form-control"
            placeholder="Add any task"
          />
          <button onClick={addNewTask} className="btn btn-outline-success">
            <i className="bi bi-plus-square"></i>
          </button>
        </div>
      </div>
      {todos?.map((element, index) => {
        // console.log(element);
        return <Task task={element} key={index} c />;
      })}
    </div>
  );
}

export default Todo;