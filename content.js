chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'replaceSelectedText' && request.replacementText) {
      const selectedText = window.getSelection();
      const range = selectedText.getRangeAt(0);
      const textNode = document.createTextNode(request.replacementText);
      range.deleteContents();
      range.insertNode(textNode);
      selectedText.removeAllRanges();
    }
  });