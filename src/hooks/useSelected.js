import { useCallback, useState } from 'react';

export default function useSelected(element) {
  const [value, setValue] = useState(null);

  const setCurrentValue = useCallback(val => setValue(val), []);

  return { value, setCurrentValue };

}
