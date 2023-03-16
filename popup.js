const endpointInput = document.getElementById('endpoint');
const saveEndpointButton = document.getElementById('saveEndpoint');

// Load the saved endpoint when the popup is opened
chrome.storage.sync.get('endpoint', (data) => {
  if (data.endpoint) {
    endpointInput.value = data.endpoint;
  }
});

// Save the endpoint when the button is clicked
saveEndpointButton.addEventListener('click', () => {
  const endpoint = endpointInput.value.trim();
  if (endpoint) {
    chrome.storage.sync.set({ endpoint }, () => {
      alert('Endpoint saved.');
    });
  } else {
    alert('Please enter a valid endpoint.');
  }
});
