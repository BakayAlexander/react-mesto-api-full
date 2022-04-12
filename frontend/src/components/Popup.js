import React from 'react';

// Этот компонент будет служить своеобразной оберткой для других попапов. В нем мы добавляем возможность закрытия по esc и клику на overlay

function Popup({ isOpen, onClose, name, children }) {
  React.useEffect(() => {
    if (!isOpen) return;
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  function handleOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div onClick={handleOverlay} className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
      {children}
    </div>
  );
}

export default Popup;
