import React, { useState, useRef, useCallback } from 'react';
import { List, ListItem } from '@audi/audi-ui-react';
import { useTranslation } from 'react-i18next';
import {
  Description,
  IconWrap,
  TooltipWrapper,
  TooltipIcon,
  TooltipTrap,
  TooltipModal,
  DescriptionWrapper,
  DescriptionText,
} from './Tooltip.Style';
import listOfDealers from '../../constants/ListOfDealers';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useFocusTrap from '../../hooks/useFocusTrap';
import { COLORS, Color } from '../../styles/variables';
import QuestionIcon from '../../assets/icons/QuestionIcon';

interface TooltipTypes {
  isOffScreen: boolean;
  checkbox: string;
  tooltipType: string;
  color?: Color;
}

const Tooltip: React.FC<TooltipTypes> = ({
  isOffScreen,
  checkbox,
  tooltipType,
  color = COLORS.black,
}) => {
  const [tooltipOpened, setTooltipOpened] = useState<boolean>(false);

  const FocusTrapRef = useFocusTrap(tooltipOpened, {
    focusElementOnClose: "div[data-component='tooltip-toggle']",
  });

  const tooltipModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(
    tooltipModalRef,
    useCallback(() => setTooltipOpened(false), []),
  );

  const { t } = useTranslation();
  return (
    <TooltipWrapper>
      <TooltipIcon isVisible={tooltipOpened} onClick={() => setTooltipOpened(true)}>
        <IconWrap>
          <QuestionIcon color={color} />
        </IconWrap>
      </TooltipIcon>
      {tooltipOpened && (
        <TooltipModal
          role="dialog"
          aria-modal="true"
          isOffScreen={isOffScreen}
          onClick={() => setTooltipOpened(false)}
          data-component="tooltip-toggle"
          ref={FocusTrapRef}
        >
          <TooltipTrap />
          {tooltipType === 'dag' && checkbox !== 'NAT' ? (
            <DescriptionWrapper ref={tooltipModalRef}>
              <DescriptionText>
                <Description>
                  {t(`promotions.filter.components.regionFilter.tooltip.dagTooltip`)}
                </Description>
              </DescriptionText>
              <List id="dealers-list" variant="bullet">
                {listOfDealers[checkbox].map((dealer) => (
                  <ListItem key={dealer}>{dealer}</ListItem>
                ))}
              </List>
            </DescriptionWrapper>
          ) : (
            <DescriptionWrapper ref={tooltipModalRef}>
              <DescriptionText>
                <Description>
                  {t(`promotions.filter.components.regionFilter.tooltip.${checkbox}`)}
                </Description>
              </DescriptionText>
            </DescriptionWrapper>
          )}
        </TooltipModal>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
