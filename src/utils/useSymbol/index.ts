import {useMemo} from "react";

export const useSymbol = () => {
  return useMemo(() => {
    return Symbol();
  }, []);
}