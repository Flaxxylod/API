import { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/App.css";

function App() {
  const [data, setData] = useState([]); // создаем массив где будут храниться данные
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 



  useEffect(() => {
    const fetchData = async () => { // вывод данных из API
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(response.data);
      } catch (err) {
        setError("Ошибка при получении данных");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const deleteData = async (id) => { //
    try {
      // Отправляем DELETE запрос к API
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      // Обновляем состояние, удаляя элемент из массива
      setData(data.filter(item => item.id !== id)); // Используйте свойство, которое идентифицирует элемент
    } catch (err) {
      setError("Ошибка при удалении данных");
    }
  };



  const updateData = async (id, newItem) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, newItem)
      setData(data.map(item => (item.id === id ? response.data : item)))
    }
    catch (err) {
      setError("Ошибка при обновлении")
    }
  }

  const handleUpdate = (item) => {
    const updatedData = { ...item, title: "Обновленный загловок" }
    updateData(item.id, updatedData);
  }



  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='app'>
      <h1>Данные из API</h1>

      {data.map((item) => (
        <div key={item.id} className="post">
          <h2>{item.id}</h2>
          <span>{item.title}</span>
          <span>{item.body}</span>
          <button onClick={() => deleteData(item.id)}>удалить</button>
           <button onClick={() => deleteData(item.id)}>Обновить</button>
        </div>
      ))}

    </div>
  );
}

export default App;
