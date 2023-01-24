import { Dispatch, SetStateAction, useEffect, useState } from "react";

function usePersistedState<S>(
  key: string,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const [init, setInit] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(key);
    console.log("saved", saved);
    if (saved) {
      setState(JSON.parse(saved));
    }
    setInit(true);
  }, [key]);
  useEffect(() => {
    if (init) {
      const saved = localStorage.getItem(key);
      if (saved != JSON.stringify(state)) {
        localStorage.setItem(key, JSON.stringify(state));
      }
    }
  }, [key, state, init]);
  return [state, setState];
}

export default usePersistedState;
