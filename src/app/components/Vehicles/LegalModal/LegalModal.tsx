import React, { useEffect } from 'react';
import { Legal, LegalText, CloseBtn, BlackBackgroundLayer } from './LegalModal.style';
import CancelLarge from '../../../assets/icons/CancelLargeIcon';
import useFocusTrap from '../../../hooks/useFocusTrap';

interface LegalModalProps {
  setIsLegalModalOpen: (arg: boolean) => void;
  legalText?: string | null;
  idForQA: string;
  isLegalModalOpen: boolean;
}

const LegalModal: React.FC<LegalModalProps> = ({
  setIsLegalModalOpen,
  legalText,
  idForQA,
  isLegalModalOpen,
}) => {
  const FocusTrapRef = useFocusTrap(isLegalModalOpen, {
    focusElementOnClose: "div[data-component='modal-open-toggle']",
  });

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLegalModalOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [setIsLegalModalOpen]);
  return (
    <div data-testid="legal-modal-wrapper">
      <BlackBackgroundLayer
        onClick={() => setIsLegalModalOpen(false)}
        data-testid="legal-modal-black-layer"
      />
      <Legal
        role="dialog"
        aria-modal="true"
        data-cy={`${idForQA} + legal-copy`}
        data-testid="legal-modal"
        ref={FocusTrapRef}
      >
        <CloseBtn
          onClick={() => setIsLegalModalOpen(false)}
          data-testid="legal-modal-close-btn"
          data-component="modal-open-toggle"
        >
          <CancelLarge />
        </CloseBtn>
        <LegalText tabIndex={0}>{legalText || null}</LegalText>
      </Legal>
    </div>
  );
};

export default LegalModal;
