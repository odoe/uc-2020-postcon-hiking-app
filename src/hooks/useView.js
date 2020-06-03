import { useEffect, useState } from 'react';

export default function useView() {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const loadView = async () => {
      const { initView } = await import('../data/map');
      const mapView = await initView(container);
    }

    loadView();
  }, [container]);

  return setContainer;
}
