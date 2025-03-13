import React from 'react';
import { Wrapper } from './LoadMore.style';
import Button from '../CtaButtons/Button';
import { CTA_LIST } from '../../constants/CtaList';

type ParentEvent = React.MouseEvent | React.KeyboardEvent;

interface LoadMoreProps {
  onClick: (event: ParentEvent) => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {
  const hanleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      onClick(event);
    }
  };

  return (
    <Wrapper onClick={onClick} onKeyDown={hanleKeyDown} data-cy="load-more-btn">
      <Button buttonName={CTA_LIST.LOAD_MORE} />
    </Wrapper>
  );
};

export default LoadMore;
