import { useState, Dispatch, SetStateAction, useEffect } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

const windowGlobal = typeof window !== 'undefined' && window;

const useStorageState = <T>(initialValue: T, key: string): Response<T> => {
  const [state, setState] = useState<T>(() => {
    if (windowGlobal) {
      const storagedState = windowGlobal.localStorage.getItem(key);

      if (storagedState) {
        return JSON.parse(storagedState);
      } else {
        return initialValue;
      }
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    windowGlobal.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export default useStorageState;
