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
    console.debug(JSON.stringify(response, null, 2));
    if (response.ec.url) {
      document.querySelector('#ec-list').classList.remove('hidden');
      document.getElementById('title').textContent = response.title;
      document.getElementById('url').textContent = response.url;
      document.querySelector('#ec').href = response.ec.url;
      document.querySelector('#ec img').src = response.ec.logo;
    } else {
      document.querySelector('#unknown').classList.remove('hidden');
    }
  }
});
