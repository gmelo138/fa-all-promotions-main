export const IS_TESTING_ENVIRONMENT =
  // running the code locally
  process.env.NODE_ENV === 'development' ||
  // test pages
  !!window.location.hostname?.startsWith?.('oneaudi-feature-app') ||
  // query parameter
  new URLSearchParams(window.location.search).get('environment') === 'development';

export const GRAPHQL_GATEWAY_URL = IS_TESTING_ENVIRONMENT
  ? 'https://qa-api.audiusa.com/graphql'
  : 'https://api.audiusa.com/graphql';

export const IS_STAGING_PAGE = window.location.href.includes('staging');

export const IS_CN_PAGE =
  window.location.pathname.includes('promotions-cn') ||
  new URLSearchParams(window.location.search).get('lng') === 'zh';
