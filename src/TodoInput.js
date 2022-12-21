const TodoInput = ({
  todo,
  setTodo,
  addTodo,
  setTodoHeadline,
  todoHeadline,
  date,
  setDate,
}) => {
  const getCurrentDateInput = () => {
    const dateObj = new Date();

    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };
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
        defaultValue={getCurrentDateInput()}
        type="date"
        placeholder="Date"
        onFocus={(e) => (e.target.type = "date")}
        value={date || getCurrentDateInput()}
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
