import { detectEC } from './detector';

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
