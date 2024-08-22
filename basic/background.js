chrome.contextMenus.create({
  id: "sendImageBlob",
  title: "Get CAPTCHA from image",
  contexts: ["image"]
});

function sendimg3server(info, tab) {
  function contentCopy(text) {
    const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value=text; document.body.appendChild(textArea); textArea.focus();textArea.select(); try{document.execCommand('copy')}catch(err){console.error('Unable to copy to clipboard',err)}document.body.removeChild(textArea)};
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      unsecuredCopyToClipboard(text);
    }
  }
  fetch(info.srcUrl)
      .then(response => response.blob())
      .then(blob => {
        let formData = new FormData();
        formData.append('image', blob, 'image.jpg');
        fetch('http://localhost:5000/get_text', {
          method: 'POST',
          body: formData
        }).then(response => response.json())
          .then(data => {
            // store in to clipboard
            contentCopy(data.text);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });

}


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendImageBlob" && info.srcUrl) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: sendimg3server,
      args: [info, tab],
    });
  }
});
