import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScriptNumber, SuperScriptButton, SuperScriptWrapper } from './style/index.style';
import LegalModal from '../Vehicles/LegalModal/LegalModal';
import { IS_CN_PAGE } from '../../constants/environment';

interface ScriptNumberTypes {
  scriptNumber: number;
  idForQA: string;
  legalType: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
}

const SuperScript: React.FC<ScriptNumberTypes> = ({ scriptNumber, legals, idForQA }) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();

  const legalTextToRender = useMemo(() => {
    if (IS_CN_PAGE && legals.cn) return legals.cn;
    if (i18n.language === 'fr') return legals.fr;
    return legals.en;
  }, [i18n.language, legals.cn, legals.en, legals.fr]);

  return (
    <SuperScriptWrapper>
      <SuperScriptButton onClick={() => setIsLegalModalOpen(true)}>
        <ScriptNumber date-cy={`${idForQA} + script-number`}> {scriptNumber} </ScriptNumber>
      </SuperScriptButton>
      {isLegalModalOpen && (
        <LegalModal
          setIsLegalModalOpen={setIsLegalModalOpen}
          isLegalModalOpen={isLegalModalOpen}
          legalText={legalTextToRender}
          idForQA={idForQA}
        />
      )}
    </SuperScriptWrapper>
  );
};

export default SuperScript;
