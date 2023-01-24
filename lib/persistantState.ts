import { Dispatch, SetStateAction, useEffect, useState } from "react";

function usePersistedState<S>(
  key: string,
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const saved =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initial = saved ? JSON.parse(saved) : initialState;
  const [state, setState] = useState(initial);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistedState;
