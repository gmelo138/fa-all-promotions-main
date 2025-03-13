/* eslint-disable prefer-template */
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { region, modelFamily, bodyType } from '../functions/queryParamFilters';

const useMetadata = (): { title: string; description: string } => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // delete the metatags present on the Audi wrapping template
    const titleElement = document.querySelectorAll('title');
    titleElement.forEach((el) => {
      el.remove();
    });

    const descriptionElement = document.querySelectorAll("meta[name='description']");
    descriptionElement.forEach((el) => {
      el.remove();
    });

    const ogTitleElement = document.querySelectorAll("meta[property='og:title']");
    ogTitleElement.forEach((el) => {
      el.remove();
    });

    const ogDescriptionElement = document.querySelectorAll("meta[property='og:description']");
    ogDescriptionElement.forEach((el) => {
      el.remove();
    });
  }, []);

  const { title, description } = useMemo(() => {
    const regionString = region?.join(', ');

    const carlineGroupString = modelFamily
      ?.map((item) => (item === 'Etron' ? 'e-tron' : item))
      .join(', ');

    const bodyStyleString = bodyType?.map((item) => (item === 'Suv' ? 'SUV' : item)).join(', ');

    // language is checked, because dynamic values are
    // interpolated in different parts of the strings

    if (!regionString && !carlineGroupString) {
      // Just NAT offers
      return {
        title: `${t('metadata.titles.noRegionNoCarline')}`,
        description: `${t('metadata.descriptions.noRegionNoCarline')}`,
      };
    }

    if (i18n.language === 'en' && regionString && !carlineGroupString) {
      return {
        title: `${regionString} ${t('metadata.titles.regionCarline')}`,
        description: `${t('metadata.descriptions.regionCarline1')} ${regionString}${t(
          'metadata.descriptions.regionCarline2',
        )} ${t('metadata.descriptions.regionCarline3')}`,
      };
    }
    if (i18n.language === 'en' && !regionString && carlineGroupString) {
      return {
        title: `${carlineGroupString}${bodyStyleString ? ` ${bodyStyleString}` : ''} ${t(
          'metadata.titles.regionCarline',
        )}`,
        description: `${t('metadata.descriptions.regionCarline1')} ${t(
          'metadata.descriptions.regionCarline2',
        )} ${carlineGroupString}${bodyStyleString ? ` ${bodyStyleString}` : ''} ${t(
          'metadata.descriptions.regionCarline3',
        )}`,
      };
    }
    if (i18n.language === 'en' && regionString && carlineGroupString) {
      return {
        title: bodyStyleString
          ? `${regionString} ${carlineGroupString} ${bodyStyleString} ${t(
              'metadata.titles.regionCarline',
            )}`
          : `${regionString} ${carlineGroupString} ${t('metadata.titles.regionCarline')}`,
        description: `${t('metadata.descriptions.regionCarline1')} ${regionString} ${t(
          'metadata.descriptions.regionCarline2',
        )} ${carlineGroupString}${bodyStyleString ? ` ${bodyStyleString}` : ''} ${t(
          'metadata.descriptions.regionCarline3',
        )}`,
      };
    }

    if (i18n.language === 'fr' && regionString && !carlineGroupString) {
      return {
        title: `${t('metadata.titles.regionNoCarline1')} ${regionString} ${t(
          'metadata.titles.regionNoCarline2',
        )}`,
        description: `${t('metadata.descriptions.regionNoCarline')} ${regionString}.`,
      };
    }
    // No region, Carline
    if (i18n.language === 'fr' && !regionString && carlineGroupString) {
      return {
        title: `${carlineGroupString}${bodyStyleString ? ` ${bodyStyleString}` : ''} ${t(
          'metadata.titles.noRegionCarline',
        )}`,
        description: `${t('metadata.descriptions.noRegionCarline1')} ${carlineGroupString}${
          bodyStyleString ? ` ${bodyStyleString}` : ''
        } ${t('metadata.descriptions.noRegionCarline2')}`,
      };
    }
    // Region, Carline
    if (i18n.language === 'fr' && regionString && carlineGroupString) {
      return {
        title: `${carlineGroupString}${bodyStyleString ? ` ${bodyStyleString}` : ''} ${t(
          'metadata.titles.regionCarline1',
        )} ${regionString} ${t('metadata.titles.regionCarline2')}`,
        description: `${t('metadata.descriptions.regionCarline1')} ${carlineGroupString}${
          bodyStyleString ? ` ${bodyStyleString}` : ''
        } ${t('metadata.descriptions.regionCarline2')}`,
      };
    }
    return { title: '', description: '' };
  }, [t, i18n]);

  return { title, description };
};

export default useMetadata;
