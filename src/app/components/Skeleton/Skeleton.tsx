// @ts-nocheck
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { COLORS } from '../../styles/variables';
import { SkeletonWrapper, Wrapper } from './Skeleton.style';

const SkeletonVehicles: React.FC = () => {
  return (
    <Wrapper>
      <SkeletonTheme color={COLORS.skeletonColor} highlightColor={COLORS.highlightColor}>
        <SkeletonWrapper>
          <Skeleton className="skeletonCard" />
          <Skeleton className="skeletonCard" />
        </SkeletonWrapper>
      </SkeletonTheme>
    </Wrapper>
  );
};

export default SkeletonVehicles;
