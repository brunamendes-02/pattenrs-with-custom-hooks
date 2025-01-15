/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useTaskStatusObserver } from "./hooks/useTaskStatusObserver";
import { useTaskState } from "./hooks/useTaskState";
import { useInputFactory } from "./hooks/useInputFactory";

const initialTasks = [
  { id: 1, title: "Tarefa 1", status: "pendente", isImportant: true },
  { id: 2, title: "Tarefa 2", status: "em progresso", isImportant: false },
];

function Task({ task, updateTaskStatus }) {
  const { state, setToInProgress, setToCompleted, resetState } = useTaskState(
    task.status
  );

  useEffect(() => {
    updateTaskStatus(task.id, state);
  }, [state]);

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Status: {state}</p>
      <button onClick={setToInProgress}>Iniciar</button>
      <button onClick={setToCompleted}>Concluir</button>
      <button onClick={resetState}>Reiniciar</button>
    </div>
  );
}

function TaskManager({ tasks }) {
  const { updateTaskStatus, addObserver, removeObserver, history } =
    useTaskStatusObserver(tasks);

  useEffect(() => {
    const logStatusChange = (updatedTasks) => {
      new Notification("Tarefas Atualizadas", {
        body: `Status das tarefas atualizado`,
      });
    };

    addObserver(logStatusChange);
    return () => removeObserver(logStatusChange);
  }, [tasks]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
      <div>
        <h2>Histórico:</h2>
        {history?.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const textInput = useInputFactory("text", {
    value: taskName,
    onChange: (e) => setTaskName(e.target.value),
  });

  const checkboxInput = useInputFactory("checkbox", {
    checked: isImportant,
    onChange: (e) => setIsImportant(e.target.checked),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title: taskName, status: "pendente", isImportant });
    setTaskName("");
    setIsImportant(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome da Tarefa: &nbsp; {textInput}</label>&nbsp;
      <label>
        Importante:
        {checkboxInput}
      </label>
      &nbsp;
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, ...newTask },
    ]);
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
