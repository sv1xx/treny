import SimpleReducer from "./components/simpleReducer";
import { useTheme } from "./components/themeContext";

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      className={
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      <h1>Текущая тема: {theme}</h1>
      <button onClick={toggleTheme}>Сменить тему</button>
      {/* <Treny /> */}
      {/* <FetchedUsers /> */}
      {/* <UserSearch /> */}
      {/* <Todo /> */}
      <SimpleReducer />
    </div>
  );
}

export default App;
