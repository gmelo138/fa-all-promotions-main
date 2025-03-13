import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BackgroundImage, VehicleImageContainer, ImageDisclaimer } from './style/index.style';
import { P } from '../../../styles/Global.style';

interface VehicleImageProps {
  modelImage: string;
  isCpoVehicle: boolean;
  year: number;
  idForQA?: string;
}

const VehicleImage: React.FC<VehicleImageProps> = ({ modelImage, isCpoVehicle, year, idForQA }) => {
  const { t } = useTranslation();
  const showDisclaimer = isCpoVehicle || year === 2023;

  const correctSizeImage = useMemo(() => {
    if (isCpoVehicle) return modelImage;
    const rawImageUrl = new URL(modelImage);
    rawImageUrl.search = '';
    return `${rawImageUrl.href}?wid=1178&mimetype=image/webp`;
  }, [isCpoVehicle, modelImage]);

  return (
    <VehicleImageContainer>
      <BackgroundImage
        isCpoVehicle={isCpoVehicle}
        modelImage={correctSizeImage}
        data-testid="vehicle-image"
        data-cy={`${idForQA} + vehicle-image`}
      />
      {showDisclaimer && (
        <ImageDisclaimer>
          <P data-testid="image-disclaimer">{t(`promotions.cpoImageDisclaimer`)}</P>
        </ImageDisclaimer>
      )}
    </VehicleImageContainer>
  );
};

export default VehicleImage;
