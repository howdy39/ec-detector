window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo' },
        sendMessageCallback
      );
    }
  );

  function sendMessageCallback(response) {
    console.log(response);
    document.getElementById('debug').textContent = JSON.stringify(response, null, 2);
  }
});
