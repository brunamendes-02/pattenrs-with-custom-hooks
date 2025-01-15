import React, { useEffect, useState } from 'react';
import { useTaskStatusObserver } from './hooks/useTaskStatusObserver';
import { useTaskState } from './hooks/useTaskState';
import { useInputFactory } from './hooks/useInputFactory';

const initialTasks = [
  { id: 1, title: 'Tarefa 1', status: 'pendente' },
  { id: 2, title: 'Tarefa 2', status: 'em progresso' },
];

function TaskManager() {
  const { tasks, updateTaskStatus, addObserver, removeObserver } = useTaskStatusObserver(initialTasks);

  useEffect(() => {
    const logStatusChange = (updatedTasks) => {
      console.log('Status das tarefas atualizado:', updatedTasks);
    };

    addObserver(logStatusChange);
    return () => removeObserver(logStatusChange);
  }, [addObserver, removeObserver]);

  return (
    <div>
      {tasks.map(task => (
        <Task key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
      ))}
    </div>
  );
}

function Task({ task, updateTaskStatus }) {
  const { state, setToInProgress, setToCompleted, resetState } = useTaskState(task.status);

  useEffect(() => {
    updateTaskStatus(task.id, state);
  }, [state, task.id, updateTaskStatus]);

  return (
    <div>
      <h3>{task.title}</h3>
      <p>Status: {state}</p>
      <button onClick={setToInProgress}>Iniciar</button>
      <button onClick={setToCompleted}>Concluir</button>
      <button onClick={resetState}>Reiniciar</button>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const textInput = useInputFactory('text', {
    value: taskName,
    onChange: e => setTaskName(e.target.value),
  });

  const checkboxInput = useInputFactory('checkbox', {
    checked: isImportant,
    onChange: e => setIsImportant(e.target.checked),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title: taskName, status: 'pendente', isImportant });
    setTaskName('');
    setIsImportant(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome da Tarefa:
        {textInput}
      </label>
      <label>
        Importante:
        {checkboxInput}
      </label>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <TaskForm addTask={addTask} />
      <TaskManager tasks={tasks} />
    </div>
  );
}

export default App;
