import { useReducer, useState } from "react";

type Task = {
  id: number;
  title: string;
  complete: boolean;
};

type Action =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "EDIT"; payload: { id: number; title: string } };

const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          complete: false,
        },
      ];

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, complete: task.complete } : task
      );

    case "EDIT":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const Todo = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [text, setText] = useState<string>("");
  const [editText, setEditText] = useState("");

  const [todos, dispatch] = useReducer(reducer, []);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: "ADD", payload: text });
      setText("");
    }
  };

  const handleToggle = (id: number) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const handleEditStart = (task: Task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  const handleEditConfirm = (id: number) => {
    if (editText.trim()) {
      dispatch({ type: "EDIT", payload: { id, title: editText } });
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Добавить
      </button>

      <ul>
        {todos.map((task) => (
          <li key={task.id} className="flex items-center justify-between py-1">
            <div
              onClick={() => handleToggle(task.id)}
              className={`flex-1 cursor-pointer ${
                task.complete ? "line-through text-gray-500" : ""
              }`}
            >
              {editId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-1 py-0.5 w-full"
                />
              ) : (
                task.title
              )}
            </div>

            <div className="ml-2 flex gap-2">
              {editId === task.id ? (
                <button
                  onClick={() => handleEditConfirm(task.id)}
                  className="text-green-600"
                >
                  ✔
                </button>
              ) : (
                <button
                  onClick={() => handleEditStart(task)}
                  className="text-blue-600"
                >
                  ✏️
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
