import { useEffect, useReducer } from "react";

type FormState = {
  values: {
    name: string;
    email: string;
    password: string;
  };
  errors: {
    name?: string;
    email?: string;
    password?: string;
  };
};

type Action =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SET_ERRORS"; errors: FormState["errors"] };

const initialState: FormState = {
  values: {
    name: "",
    email: "",
    password: "",
  },
  errors: {},
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
    e.preventDefault();
  };

  useEffect(() => {
    const errors: FormState["errors"] = {};
    if (state.values.name.trim() === "") {
      errors.name = "Имя обязательно";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.values.email)) {
      errors.email = "Некорректный email";
    }

    if (state.values.password.length < 6) {
      errors.password = "Минимум 6 символов";
    }

    dispatch({ type: "SET_ERRORS", errors });
  }, [state.values]);

  return (
    <div>
      <div className="">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="name"
            id="name"
            value={state.values.name}
            onChange={handleChange}
            placeholder="Imya"
          />
          {state.errors.name && (
            <span className="text-red-500">{state.errors.name}</span>
          )}
          <input
            type="email"
            name="email"
            id="email"
            value={state.values.email}
            onChange={handleChange}
            placeholder="email"
          />
          {state.errors.email && (
            <span className="text-red-500">{state.errors.email}</span>
          )}
          <input
            type="password"
            name="password"
            id="password"
            value={state.values.password}
            onChange={handleChange}
            placeholder="password"
          />
          {state.errors.password && (
            <span className="text-red-500">{state.errors.password}</span>
          )}
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
