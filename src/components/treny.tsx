import { useEffect, useState } from "react";

type User = {
  name: string;
  surname: string;
};

const Treny = () => {
  const [data, setData] = useState<User[]>(() => {
    const stored = localStorage.getItem("data");
    return stored ? JSON.parse(stored) : [];
  });
  const [name, setName] = useState(() => {
    const stored = localStorage.getItem("name");
    return stored ? stored : "";
  });
  const [surname, setSurname] = useState(() => {
    const stored = localStorage.getItem("surname");
    return stored ? stored : "";
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);
  }, [name, surname, data]);

  const handleAdd = () => {
    setData((prev) => [...prev, { name, surname }]);
    setName("");
    setSurname("");
  };

  const handleDelete = () => {
    setData((prev) => prev.slice(0, -1));
  };

  return (
    <div className="m-auto max-w-[1000px] flex justify-center">
      <div className="flex items-center gap-14">
        <div className="flex flex-col">
          <h1>Данные:</h1>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {item.name} {item.surname}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <input
            className="border border-amber-200"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            placeholder="Имя"
          />
          <input
            className="border border-amber-200"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            name="surname"
            id="surname"
            placeholder="фамилия"
          />
          <button onClick={handleAdd}>Добавить</button>
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default Treny;
