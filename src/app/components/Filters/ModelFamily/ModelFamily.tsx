import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setModelFamily } from '../../../redux/actions';
import { getTemporaryFilters } from '../../../redux/reducers';
import { Button, Label } from './style/ModelFamilyList.style';

interface ModelFamilyButtonInterface {
  model: string;
  isAvailable: boolean;
}

const ModelFamily: React.FC<ModelFamilyButtonInterface> = ({ model, isAvailable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modelFamilyFilter } = useSelector(getTemporaryFilters);

  const isActive = modelFamilyFilter.includes(model);

  useEffect(() => {
    if (!isAvailable && isActive) {
      dispatch(setModelFamily({ filter: model }));
    }
  }, [dispatch, isAvailable, model, isActive]);

  const handleClick = (event: React.MouseEvent) => {
    if (!isAvailable) {
      event.preventDefault();
      return;
    }
    dispatch(setModelFamily({ filter: model }));
  };

  return (
    <Button
      isActive={isActive}
      onClick={(event) => handleClick(event)}
      key={model}
      isAvailable={isAvailable}
      tabIndex={isAvailable ? 0 : -1}
      data-cy={`${model} + name`}
      data-testid={model}
    >
      <Label isActive={isActive} isAvailable={isAvailable}>
        {t(`promotions.filter.components.listOfAllFilters.${model}`)}
      </Label>
    </Button>
  );
};
export default ModelFamily;
