import { useEffect } from 'react';

const useDocumentTitle = (title) => {
    useEffect(() => {
        if (title === 'Home') {
            document.title = 'GovSingleWindow';
        } else {
            document.title = `${title} - GovSingleWindow`;
        }
    }, [title]);
};

export default useDocumentTitle;
