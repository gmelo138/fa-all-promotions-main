import React, { useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Motion, spring } from 'react-motion';
import { useDispatch, useSelector } from 'react-redux';
import { device } from '../../styles/devices';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import useFocusTrap from '../../hooks/useFocusTrap';
import { setTemporaryFilters } from '../../redux/actions';
import { getConfirmedFilters, getTemporaryFilters } from '../../redux/reducers';
import { Overlay, Wrapper } from './FiltersDrawer.style';
import { filtersCancel } from '../../utils/analyticsEventListeners';

interface DrawerProps {
  onClose: () => void;
  isFiltersOpened: boolean;
  children: React.ReactNode;
}

const FiltersDrawer: React.FC<DrawerProps> = ({ onClose, children, isFiltersOpened }) => {
  const dispatch = useDispatch();
  const confirmedFilters = useSelector(getConfirmedFilters);
  const temporaryFilters = useSelector(getTemporaryFilters);

  useLockBodyScroll(isFiltersOpened);
  const isMobile = !useMediaQuery({ query: device.tablet });

  const FocusTrapRef = useFocusTrap(isFiltersOpened, {
    focusElementOnClose: "button[data-component='results-toolbar-filter-toggle']",
  });

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        filtersCancel(temporaryFilters);
        dispatch(setTemporaryFilters({ filters: confirmedFilters }));
      }
    },
    [onClose, dispatch, confirmedFilters, temporaryFilters],
  );

  const handleDeclineFilters = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;
      onClose();
      filtersCancel(temporaryFilters);
      dispatch(setTemporaryFilters({ filters: confirmedFilters }));
    },
    [onClose, dispatch, confirmedFilters, temporaryFilters],
  );

  useEffect(() => {
    if (!isFiltersOpened) return undefined;

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFiltersOpened, handleKeyPress]);

  const desktopStyle = isFiltersOpened
    ? { left: spring(0, { stiffness: 300, damping: 30 }), opacity: spring(1) }
    : { left: spring(-570, { stiffness: 400, damping: 30 }), opacity: spring(0) };

  const mobileStyle = isFiltersOpened
    ? { left: spring(0), opacity: spring(1) }
    : { left: spring(-100), opacity: spring(0) };

  return (
    <Motion style={isMobile ? mobileStyle : desktopStyle}>
      {({ left, opacity }) => (
        <Overlay
          onClick={handleDeclineFilters}
          tabIndex={0}
          style={{ opacity, display: opacity ? '' : 'none' }}
        >
          <Wrapper
            aria-label="filter drawer"
            style={isMobile ? { left: `${left}%` } : { left: `${left}px` }}
            ref={FocusTrapRef}
          >
            {opacity !== 0 && children}
          </Wrapper>
        </Overlay>
      )}
    </Motion>
  );
};

export default FiltersDrawer;
