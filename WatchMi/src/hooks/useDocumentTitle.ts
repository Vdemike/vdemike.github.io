import { useLayoutEffect } from 'react';

const useDocumentTitle = (title?: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'WATCHMI | Movie Browser';
    }
  }, [title]);
};

export default useDocumentTitle;
