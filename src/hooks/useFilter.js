import { useEffect } from 'react';

export default function useFilter(name) {
  useEffect(() => {
    const filter = async () => {
      if (name) {
        const { filterMapData } = await import('../data/map');
        filterMapData(name);
      }
    }
    filter();
  }, [name]);

  return name;
}
