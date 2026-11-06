import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CursorContext = createContext({
  cursorType: 'default',
  cursorText: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const setCursor = useCallback((type = 'default', text = '') => {
    setCursorType(type);
    setCursorText(text);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorType('default');
    setCursorText('');
  }, []);

  const value = useMemo(
    () => ({ cursorType, cursorText, setCursor, resetCursor }),
    [cursorType, cursorText, setCursor, resetCursor]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
