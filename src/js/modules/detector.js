const ecMap = {
  STORESJP: {
    url: 'https://stores.jp',
    logo: '/images/ec/storesjp.svg',
    detector: function() {
      return document.querySelector('html').getAttribute('ng-app') === 'StoresJp';
    },
  },
  BASE: {
    url: 'https://thebase.in',
    logo: '/images/ec/base.png',
    detector: function() {
      return document.querySelector('meta[content="BASE"]') !== null;
    },
  },
  SHOPIFY: {
    url: 'https://www.shopify.jp',
    logo: '/images/ec/shopify.png',
    detector: function() {
      return document.querySelector('[src*="cdn.shopify.com"]') !== null;
    },
  },
};

export function detectEC() {
  let result;

  result = Object.entries(ecMap).find(([, ecData]) => {
    const detector = ecData.detector;
    return detector() === true;
  });

  if (result) {
    return result[1];
  }
  return {};
}
