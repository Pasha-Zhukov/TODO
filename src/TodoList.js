import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import Loader from "./loader/Loader";

const TodoList = ({ list, setTodos }) => {
  const [activeButton, setActiveButton] = useState("all");
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [valueHead, setValueHead] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [file, setFile] = useState("");

  let now = new Date();
  let currentDate = Date.parse(now) / 1000;
  /**
   *Ф-я по получению event для отображения активной кнопки: "All, Active, Complited".
   * @param {string} e - в event приходит атрибут name и в зависимости от выбранной кнопки меняется state.
   */
  const clickedButtonHandler = (e) => {
    const { name } = e.target;
    setActiveButton(name);
  };
  /**
   *Ф-я по изменению todo при нажатии на кнопку "edit". Берутся текущие значения и подставляются в редактируемое поле.
   * @param {string} id - id элемента.
   * @param {string} todo - Основная информация, введенная пользователем.
   * @param {string} todoHeadline - Заголовок todo.
   * @param {date} date - Дата до которой нужно завершить задание.
   */
  function editTodo(id, todo, todoHeadline, date) {
    setValueHead(todoHeadline);
    setEdit(id);
    setValue(todo);
    setValueDate(date);
  }
  /**
   *Ф-я по сохранению todo после изменения по нажатию кнопки "save".
   * @param {object} entry - Передаем объект. После нажатия кнопки "save", происходит обновление
   * данных которые изменил пользователь, в случае если он ничего не поменял, данные остаются прежними.
   */
  function saveTodo(entry) {
    updateDoc(doc(db, "todos", entry.id), {
      todo: value,
      todoHeadline: valueHead,
      date: valueDate,
    });

    setEdit(null);
  }
  /**
   *Ф-я по получению event поля input при нажатии кнопки "обзор".
   * @param {eny} event -загружаемый объект.
   */
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  /**
   *Ф-я по прикреплению файла к элементу списка tudo, а также ф-я получит ссылку на скачивание и выводит ее пользователю.
   * @param {object} entry- Объект нужен для поиска нужного элемента по id. Чтобы прикрепляемый файл добавлялся конкретному элементу списка todo.
   */
  const handleUpload = (entry) => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/file/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setTodos([
            ...list.map((obj) =>
              entry.id === obj.id
                ? updateDoc(doc(db, "todos", entry.id), {
                    url: url,
                  })
                : obj
            ),
          ]);
        });
      }
    );
  };

  return (
    <>
      {list?.length > 0 && list !== false ? (
        <>
          <div className="wrapper-button">
            <button
              name="all"
              className={activeButton === "all" ? "active" : ""}
              onClick={(e) => {
                setTodos([
                  ...list.map((obj) =>
                    obj.check || !obj.check ? { ...obj, visibility: true } : ""
                  ),
                ]);
                clickedButtonHandler(e);
              }}
            >
              All
            </button>
            <button
              name="active"
              className={activeButton === "active" ? "active" : ""}
              onClick={(e) => {
                setTodos([
                  ...list.map((obj) =>
                    obj.check
                      ? { ...obj, visibility: false }
                      : { ...obj, visibility: true }
                  ),
                ]);
                clickedButtonHandler(e);
              }}
            >
              Active
            </button>
            <button
              name="complited"
              className={activeButton === "complited" ? "active" : ""}
              onClick={(e) => {
                setTodos([
                  ...list.map((obj) =>
                    obj.check
                      ? { ...obj, visibility: true }
                      : { ...obj, visibility: false }
                  ),
                ]);
                clickedButtonHandler(e);
              }}
            >
              Complited
            </button>
          </div>
          <ul className="todo-list">
            {list.map((entry) => (
              <>
                <div
                  className="todo"
                  key={entry.id}
                  style={
                    entry.visibility
                      ? { visibility: "visible" }
                      : { display: "none" }
                  }
                >
                  <input
                    className="input_checkbox"
                    type="checkbox"
                    defaultChecked={entry.check}
                    onClick={() => {
                      updateDoc(doc(db, "todos", entry.id), {
                        check: !entry.check,
                      });
                    }}
                  />
                  <li className={entry.check ? "li_checked" : ""}>
                    {edit === entry.id ? (
                      <div>
                        <input
                          className="input_edit"
                          type="text"
                          value={valueHead}
                          onChange={(e) => setValueHead(e.target.value)}
                        />
                        <input
                          className="input_edit"
                          type="text"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        <input
                          className="input_edit"
                          type="date"
                          value={valueDate}
                          onChange={(e) => {
                            setValueDate(e.target.value);
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {entry?.todoHeadline} |{" "}
                    {Date.parse(entry.date) / 1000 > currentDate
                      ? " DEADLINE - "
                      : " OVERDUE - "}
                    {entry?.date} | {entry?.todo}
                    {/* && item?.unwrap === false */}
                  </li>
                  {edit === entry.id ? (
                    <button
                      className="delete-button"
                      onClick={() => saveTodo(entry)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="delete-button"
                      onClick={() => {
                        editTodo(
                          entry.id,
                          entry.todo,
                          entry.todoHeadline,
                          entry.date
                        );
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteDoc(doc(db, "todos", entry.id));
                    }}
                  >
                    Delete todo
                  </button>
                  {!entry.url ? (
                    <input
                      className="input_file"
                      type="file"
                      onChange={handleChange}
                    />
                  ) : (
                    ""
                  )}

                  {!entry.url ? (
                    <button
                      className="delete-button"
                      onClick={() => handleUpload(entry)}
                    >
                      Upload
                    </button>
                  ) : (
                    ""
                  )}

                  <div className="url-button">
                    <a href={entry.url}>
                      {entry.url ? (
                        <button className="delete-button">Download file</button>
                      ) : (
                        ""
                      )}
                    </a>
                  </div>
                </div>
                <div className="unwrap">
                  {" "}
                  {entry?.todo?.length + entry?.todoHeadline?.length > 130
                    ? "далее"
                    : null}
                </div>
              </>
            ))}
          </ul>
        </>
      ) : (
        <div className="empty">
          {}
          {list ? <p>No task found</p> : <Loader />}
        </div>
      )}
    </>
  );
};

export default TodoList;
