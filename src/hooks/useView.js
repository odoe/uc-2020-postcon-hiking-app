import { useEffect, useState } from 'react';

export default function useView() {
  const [container, setContainer] = useState(null);
  const [searchContainer, setSearchContainer] = useState(null);

  useEffect(() => {
    const loadView = async () => {
      const { initView } = await import('../data/map');
      const mapView = await initView(container, searchContainer);
    };

    loadView();
  }, [container, searchContainer]);

  return { setContainer, setSearchContainer };
}
