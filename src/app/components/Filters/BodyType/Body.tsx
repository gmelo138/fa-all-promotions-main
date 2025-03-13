import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setBodyType } from '../../../redux/actions';
import { getTemporaryFilters } from '../../../redux/reducers';
import { BodyTypeWrapper, BodyTypeName } from './style/BodyTypes.style';
import { bodyTypeDataById } from '../../../constants/BodyTypeList';

interface BodyTypes {
  body: string;
  isAvailable: boolean;
  defaultImage: React.FC<{ color?: string }>;
  selectedImage: React.FC<{ color?: string }>;
}

const Body: React.FC<BodyTypes> = ({
  body,
  isAvailable,
  defaultImage: DefaultSVGImage,
  selectedImage: SelectedSVGImage,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bodyTypeFilter } = useSelector(getTemporaryFilters);

  const isActive = bodyTypeFilter.includes(body);

  const selectBodyTypeClick = (bodyName: string) => {
    if (!isAvailable) {
      return;
    }
    dispatch(setBodyType({ filter: bodyName }));
  };

  useEffect(() => {
    if (!isAvailable && isActive) {
      dispatch(setBodyType({ filter: body }));
    }
  }, [dispatch, body, isAvailable, isActive]);

  return (
    <BodyTypeWrapper
      isAvailable={isAvailable}
      onClick={() => selectBodyTypeClick(body)}
      tabIndex={isAvailable ? 0 : -1}
      data-testid={body}
    >
      <div data-cy={`${body} + image`}>{isActive ? <SelectedSVGImage /> : <DefaultSVGImage />}</div>
      <BodyTypeName isActive={isActive} data-cy={`${body} + name`}>
        {t(`promotions.filter.components.listOfAllFilters.${bodyTypeDataById[body].bodyTitle}`)}
      </BodyTypeName>
    </BodyTypeWrapper>
  );
};

export default Body;
