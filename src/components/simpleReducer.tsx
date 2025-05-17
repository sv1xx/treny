import { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state: typeof initialState, action: { type: string }) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const SimpleReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="m-auto max-w-[900px]">
        <h1>Счетчик: {state.count}</h1>
        <div className="flex items-center gap-4">
          <button
            className="dark:text-white"
            onClick={() => dispatch({ type: "increment" })}
          >
            +1
          </button>
          <button
            className="dark:text-white"
            onClick={() => dispatch({ type: "decrement" })}
          >
            -1
          </button>
          <button
            className="dark:text-white"
            onClick={() => dispatch({ type: "reset" })}
          >
            Очистить
          </button>
        </div>
      </div>
    </>
  );
};

export default SimpleReducer;
