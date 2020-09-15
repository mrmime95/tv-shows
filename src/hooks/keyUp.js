import { useEffect } from 'react';

export default function useKeyUp(keyCode, action) {
  function handleKeyUp(event) {
    if (event.keyCode === keyCode) {
      action();
    }
  }

  useEffect(() => {
    if (window) {
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  });
}
