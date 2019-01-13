console.info('EC Detector');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const ec = detectEC();
  const message = {
    url: window.location.origin,
    title: document.querySelector('title').textContent,
    ec: ec,
  };
  sendResponse(message);
});

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
};

function detectEC() {
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
