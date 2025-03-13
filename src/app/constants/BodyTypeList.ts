import SUVSelectedIcon from '../assets/icons/FilterBodyTypeOptions/SUVSelectedIcon';
import SUVDefaultIcon from '../assets/icons/FilterBodyTypeOptions/SUVDefaultIcon';
import SedanSelectedIcon from '../assets/icons/FilterBodyTypeOptions/SedanSelectedIcon';
import SedanDefaultIcon from '../assets/icons/FilterBodyTypeOptions/SedanDefaultIcon';
import AllroadQuattroSelectedIcon from '../assets/icons/FilterBodyTypeOptions/AllroadQuattroSelectedIcon';
import AllroadQuattroDefaultIcon from '../assets/icons/FilterBodyTypeOptions/AllroadQuattroDefaultIcon';
import CoupeSelectedIcon from '../assets/icons/FilterBodyTypeOptions/CoupeSelectedIcon';
import CoupeDefaultIcon from '../assets/icons/FilterBodyTypeOptions/CoupeDefaultIcon';
import SportbackSelectedIcon from '../assets/icons/FilterBodyTypeOptions/SportbackSelectedIcon';
import SportbackDefaultIcon from '../assets/icons/FilterBodyTypeOptions/SportbackDefaultIcon';
import SpyderSelectedIcon from '../assets/icons/FilterBodyTypeOptions/SpyderSelectedIcon';
import SpyderDefaultIcon from '../assets/icons/FilterBodyTypeOptions/SpyderDefaultIcon';
import RoadsterSelectedIcon from '../assets/icons/FilterBodyTypeOptions/RoadsterSelectedIcon';
import RoadsterDefaultIcon from '../assets/icons/FilterBodyTypeOptions/RoadsterDefaultIcon';
import CabrioletSelectedIcon from '../assets/icons/FilterBodyTypeOptions/CabrioletSelectedIcon';
import CabrioletDefaultIcon from '../assets/icons/FilterBodyTypeOptions/CabrioletDefaultIcon';
import AvantSelectedIcon from '../assets/icons/FilterBodyTypeOptions/AvantSelectedIcon';
import AvantDefaultIcon from '../assets/icons/FilterBodyTypeOptions/AvantDefaultIcon';

interface BodyById {
  [key: string]: {
    bodyTitle: string;
    url: {
      [key: string]: React.FC<any>;
    };
  };
}

export const bodyTypes = [
  'SUV',
  'Sedan',
  'allroad quattro',
  'Coupe',
  'Sportback',
  'Spyder',
  'Roadster',
  'Cabriolet',
  'Avant',
];

export const bodyTypeDataById: BodyById = {
  SUV: {
    bodyTitle: 'SUV',
    url: {
      static: SUVDefaultIcon,
      selected: SUVSelectedIcon,
    },
  },
  Sedan: {
    bodyTitle: 'Sedan',
    url: {
      static: SedanDefaultIcon,
      selected: SedanSelectedIcon,
    },
  },
  'allroad quattro': {
    bodyTitle: 'allroad quattro',
    url: {
      static: AllroadQuattroDefaultIcon,
      selected: AllroadQuattroSelectedIcon,
    },
  },
  Coupe: {
    bodyTitle: 'Coupe',
    url: {
      static: CoupeDefaultIcon,
      selected: CoupeSelectedIcon,
    },
  },
  Sportback: {
    bodyTitle: 'Sportback',
    url: {
      static: SportbackDefaultIcon,
      selected: SportbackSelectedIcon,
    },
  },
  Spyder: {
    bodyTitle: 'Spyder',
    url: {
      static: SpyderDefaultIcon,
      selected: SpyderSelectedIcon,
    },
  },
  Roadster: {
    bodyTitle: 'Roadster',
    url: {
      static: RoadsterDefaultIcon,
      selected: RoadsterSelectedIcon,
    },
  },
  Cabriolet: {
    bodyTitle: 'Cabriolet',
    url: {
      static: CabrioletDefaultIcon,
      selected: CabrioletSelectedIcon,
    },
  },
  Avant: {
    bodyTitle: 'Avant',
    url: {
      static: AvantDefaultIcon,
      selected: AvantSelectedIcon,
    },
  },
};
