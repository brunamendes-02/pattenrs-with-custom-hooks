import { useState, useEffect } from 'react';

export function useTaskStatusObserver(addedTasks) {
  const [tasks, setTasks] = useState(addedTasks);
  const [observers, setObservers] = useState([]);

  useEffect(() => {
    observers.forEach(callback => callback(tasks));
  }, [tasks, observers]);


  useEffect(() => {
    setTasks(addedTasks)
  }, [addedTasks]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addObserver = (callback) => {
    setObservers(prevObservers => [...prevObservers, callback]);
  };

  const removeObserver = (callback) => {
    setObservers(prevObservers =>
      prevObservers.filter(observer => observer !== callback)
    );
  };

  return { updateTaskStatus, addObserver, removeObserver };
}