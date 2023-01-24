import { Dispatch, SetStateAction, useEffect, useState } from "react";

function usePersistedState<S>(
  key: string,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
        setState(JSON.parse(saved))
    }
  }, [key])
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistedState;
