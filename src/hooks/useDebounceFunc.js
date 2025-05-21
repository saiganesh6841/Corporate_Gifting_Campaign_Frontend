import { useRef } from "react";

const useDebounceFunc = (func, time) => {
  const timer = useRef(null);
  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      return func.apply(this, args);
    }, time);
  };
};

export default useDebounceFunc;
