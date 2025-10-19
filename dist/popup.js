document.getElementById("toggle").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
 
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleDarkMode,
    });
  });
 
  function toggleDarkMode() {
    const darkStyleId = "dark-mode-extension-style";
    let darkStyle = document.getElementById(darkStyleId);
 
    if (darkStyle) {
      darkStyle.remove();
    } else {
      darkStyle = document.createElement("style");
      darkStyle.id = darkStyleId;
      darkStyle.innerHTML = `
  /* Escurece tudo, exceto imagens, vídeos e elementos com background-image */
  *:not(img):not(video):not(canvas):not(svg):not(picture):not([style*="background-image"]) {
    background-color: #121212 !important;
    color: #ffffff !important;
    border-color: #333 !important;
  }


  /* Links */
  a, a * {
    color: #bb86fc !important;
  }


  /* Inputs e botões */
  input, textarea, select, button {
    background-color: #1e1e1e !important;
    color: #ffffff !important;
    border-color: #333 !important;
  }
`;
      document.head.appendChild(darkStyle);
    }
  }
 
