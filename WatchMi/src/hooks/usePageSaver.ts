import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useDidMount from './useDidMount';

const usePageSaver = (path?: string) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace('/', '');
  const [currentPage, setCurrentPage] = useState(() =>
    localStorage.WATCHMIPage ? JSON.parse(localStorage.WATCHMIPage)[p] : 1,
  );
  const didMount = useDidMount();

  useLayoutEffect(() => {
    const storageItem = localStorage.getItem('WATCHMIPage');

    if (storageItem) {
      const WATCHMIPage = JSON.parse(storageItem);
      const page = WATCHMIPage[p];

      if (typeof WATCHMIPage[p] !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        'WATCHMIPage',
        JSON.stringify({
          [p]: currentPage,
        }),
      );
    }
  }, []);

  useEffect(() => {
    const storageItem = localStorage.getItem('WATCHMIPage');

    if (didMount && storageItem) {
      const WATCHMIPage = JSON.parse(storageItem);

      localStorage.setItem(
        'WATCHMIPage',
        JSON.stringify({
          ...WATCHMIPage,
          [p]: currentPage,
        }),
      );
    }
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
