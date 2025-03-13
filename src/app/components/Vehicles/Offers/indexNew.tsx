import React, { useMemo, useState } from 'react';
import { Tab, TabGroup } from '@audi/audi-ui-react';
import { useTranslation } from 'react-i18next';
import { Offer, Tabs } from '../VehicleCard/style/indexNew.style';
import { UpdatedOffers } from '../../../types/promotionsTypes';
import LeaseAndFinance from './LeaseAndFinance';
import Cash from './Cash';
import OfferPlus from './OfferPlus';

interface OffersProps {
  offers: UpdatedOffers;
  isCpoVehicle: boolean;
  idForQA: string;
  expiryDate: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
}

const OffersNew: React.FC<OffersProps> = ({
  isCpoVehicle,
  offers,
  idForQA,
  legals,
  expiryDate,
}) => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const [selectedTab, setSelectedTab] = useState('Lease');

  const listOfTabs = useMemo(() => {
    if (isCpoVehicle) {
      return ['Finance'];
    }
    return Object.keys(offers);
  }, [offers, isCpoVehicle]);

  const offersPlus = offers[selectedTab].OffersPlus;
  const cash = offers[selectedTab].Cash;

  return (
    <Offer>
      <Tabs lang={lang} data-cy={`${idForQA} + offerTab`}>
        <TabGroup
          id="tab-group__basic"
          selected={selectedTab}
          onSelect={setSelectedTab}
          data-testid={`${idForQA} + offerTabGroup`}
          data-cy={`${idForQA} + offerTabGroup`}
        >
          {listOfTabs.map((tab) => (
            <Tab id={tab} key={tab}>
              {t(`promotions.offers.${tab}`)}
            </Tab>
          ))}
        </TabGroup>
      </Tabs>
      {selectedTab === 'Cash' ? (
        <Cash legals={legals} offers={offers} idForQA={idForQA} />
      ) : (
        <LeaseAndFinance
          offers={offers}
          selectedTab={selectedTab}
          idForQA={idForQA}
          legals={legals}
          expiryDate={expiryDate}
        />
      )}
      {offersPlus ? (
        <OfferPlus
          offersPlus={offersPlus}
          cash={cash}
          idForQA={idForQA}
          legals={legals}
          isCpoVehicle={isCpoVehicle}
        />
      ) : null}
    </Offer>
  );
};

export default OffersNew;
