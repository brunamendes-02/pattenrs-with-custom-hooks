import { useState } from 'react';

function useTaskState(initialState = 'pendente') {
  const [state, setState] = useState(initialState);

  const setToInProgress = () => setState('em progresso');
  const setToCompleted = () => setState('concluída');
  const resetState = () => setState('pendente');

  return {
    state,
    setToInProgress,
    setToCompleted,
    resetState,
  };
}