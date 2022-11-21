const TodoInput = ({
  todo,
  setTodo,
  addTodo,
  setTodoHeadline,
  todoHeadline,
  date,
  setDate,
}) => {
  return (
    <div className="input-wrapper">
      <input
        className="input_head"
        type="text"
        name="head"
        value={todoHeadline}
        placeholder="Headline"
        onChange={(e) => {
          setTodoHeadline(e.target.value);
        }}
      />

      <input
        className="input_todo"
        type="text"
        name="todo"
        value={todo}
        placeholder="Create a new todo"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <input
        className="input_data"
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <button className="add-button" onClick={addTodo}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
