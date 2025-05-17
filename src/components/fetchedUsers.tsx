import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

const FetchedUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadind, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(url);

        setUsers(response.data);

        // const response = await fetch(url);

        // if (!response.ok) {
        //   throw new Error(`Ошибка: ${response.status}`);
        // }

        // const data: User[] = await response.json();
        // setUsers(data);
      } catch (error: any) {
        setError(error.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <div className="">
        <h1 className="text-xl font-bold mb-4">Список пользователей</h1>
        {loadind && <p>Загрузка...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loadind && !error && users.length === 0 && <p>Нет данных</p>}

        {!loadind && !error && users.length > 0 && (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="border p-2 rounded-2xl">
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FetchedUsers;
