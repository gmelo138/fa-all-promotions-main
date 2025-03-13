import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../CtaButtons/Button';
import { CTA_LIST } from '../../constants/CtaList';
import { Header, Container, IconContainer, ContentInfo, ButtonContainer } from './NoResults.style';
import CarSearch from '../../assets/icons/CarSearchIcon';

const NoResults: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header> {t(`promotions.errorPage.noResults`)} </Header>
      <IconContainer>
        <CarSearch />
      </IconContainer>
      <ContentInfo> {t(`promotions.errorPage.contentInfo`)} </ContentInfo>
      <ButtonContainer>
        <Button buttonName={CTA_LIST.VIEW_INVENTORY_NO_RESULTS} noResults />
        <div style={{ paddingTop: '6px' }} />
        <Button buttonName={CTA_LIST.CONTACT_DEALER} />
      </ButtonContainer>
    </Container>
  );
};

export default NoResults;
