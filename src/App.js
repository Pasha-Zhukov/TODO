import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { db } from "./firebase.js";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import "./App.less";

const App = () => {
  const [todoHeadline, setTodoHeadline] = useState("");
  const [date, setDate] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [todo]);
  /**
   *Ф-я по добавлению todo в объект при нажатии кнопки Add
   */
  const addTodo = () => {
    const newItem = {
      todoHeadline: todoHeadline,
      date: date,
      todo: todo,
      check: false,
      visibility: true,
      url: "",
    };
    if (todo !== "" && date !== "" && todoHeadline !== "") {
      addDoc(collection(db, "todos"), newItem);
      setTodoHeadline("");
      setTodo("");
      setDate("");
    }
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoInput
        todo={todo}
        todoHeadline={todoHeadline}
        setTodoHeadline={setTodoHeadline}
        setTodo={setTodo}
        addTodo={addTodo}
        date={date}
        setDate={setDate}
      />
      <TodoList list={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
