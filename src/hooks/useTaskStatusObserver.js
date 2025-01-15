import { useState, useEffect } from "react";

export function useTaskStatusObserver(addedTasks) {
  const [tasks, setTasks] = useState(addedTasks);
  const [observers, setObservers] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    observers.forEach((callback) => callback(tasks));
  }, [tasks, observers]);

  const updateTaskStatus = (taskId, newStatus) => {
    const taskName = tasks.find((task) => task.id === taskId).title;
    setHistory((prevHistory) => [...prevHistory, `${taskName} foi pro status ${newStatus}`]);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addObserver = (callback) => {
    setObservers((prevObservers) => [...prevObservers, callback]);
  };

  const removeObserver = (callback) => {
    setObservers((prevObservers) =>
      prevObservers.filter((observer) => observer !== callback)
    );
  };

  return { updateTaskStatus, addObserver, removeObserver, history };
}
