console.info('EC Detector');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.debug('content', request, sender);
  const ec = detectEC();
  const message = {
    url: location.href,
    title: document.querySelector('title').textContent,
    ec: ec,
  };
  sendResponse(message);
});

function detectEC() {
  let result = 'unknown';

  const detections = {
    'STORES.jp': isStoresJP,
    BASE: isBASE,
  };

  Object.entries(detections).some(([ec, detecter]) => {
    console.log(ec, detecter());
    if (detecter() === true) {
      result = ec;
      return true;
    }
  });

  return result;
}

function isStoresJP() {
  return document.querySelector('html').getAttribute('ng-app') === 'StoresJp';
}
function isBASE() {
  return document.querySelector('meta[content="BASE"]') !== null;
}
