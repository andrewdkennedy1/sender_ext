chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'sendToEndpoint',
      title: 'Send to HTTP endpoint',
      contexts: ['selection']
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'sendToEndpoint') {
      const selectedText = info.selectionText;
      postData(selectedText, tab.id);
    }
  });
  
  async function postData(text, tabId) {
    chrome.storage.sync.get('endpoint', async (data) => {
      if (!data.endpoint) {
        console.error('Endpoint not set.');
        return;
      }
  
      const url = data.endpoint;
      const postData = { text: text };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        const result = await response.json();
        console.log(result);
  
        // Send the response text to the content script
        chrome.tabs.sendMessage(tabId, {
          action: 'replaceSelectedText',
          replacementText: result.text // Update this property based on your endpoint's response structure
        });
      } catch (error) {
        console.error('Error posting data:', error);
      }
    });
  }
  