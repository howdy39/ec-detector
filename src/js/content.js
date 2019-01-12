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
  if (isStoresJP()) {
    return 'STORES.jp';
  }
  return 'unknown';
}

function isStoresJP() {
  return document.querySelector('html').getAttribute('ng-app') === 'StoresJp';
}
