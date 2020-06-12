import { useEffect } from 'react';

export default function useFilter(names) {
  useEffect(() => {
    const filter = async () => {
      if (names) {
        const { filterMapData } = await import('../data/map');
        filterMapData(names);
      }
    }
    filter();
  }, [names]);

  return names;
}
