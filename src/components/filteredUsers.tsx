import axios from "axios";
import React, { useState, useMemo, useEffect, useCallback } from "react";

type User = {
  id: number;
  name: string;
};

export const UserSearch = () => {
  const [names, setNames] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const url = "https://jsonplaceholder.typicode.com/users";

      try {
        setLoading(true);
        const response = await axios.get(url);
        setNames(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Ошибка", error.message);
          console.error("Код ошибки", error?.response?.status);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const sortedUsers = useMemo(() => {
    return [...names].sort((a, b) => a.name.localeCompare(b.name));
  }, [names]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedUsers, search]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Поиск по имени..."
        className="border p-2 mb-4 w-full"
      />

      {loading ? (
        <p>Загрузка</p>
      ) : (
        // <ul>
        //   {Users.map((user: User) => (
        //     <li key={user.id} className="py-1">
        //       {user.name}
        //     </li>
        //   ))}
        // </ul>
        <ul>
          {filteredUsers.map((user: User) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
