import { useEffect, useRef, useState } from "react";

export const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={toggleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Открыть меню
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100">Пункт 1</li>
            <li className="px-4 py-2 hover:bg-gray-100">Пункт 2</li>
            <li className="px-4 py-2 hover:bg-gray-100">Пункт 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};
