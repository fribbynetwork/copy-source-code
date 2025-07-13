document.getElementById('copyButton').addEventListener('click', async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  
  if (tab.id) {
    // Esegui uno script nella pagina attiva per ottenere il codice sorgente
    try {
      const result = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.documentElement.outerHTML
      });
      
      const htmlSource = result[0].result;
      
      // Copia nel clipboard
      await navigator.clipboard.writeText(htmlSource);
      
      document.getElementById('status').textContent = 'Source code copied to clipboard';
    } catch (error) {
      console.error('Errore:', error);
      document.getElementById('status').innerHTML = '<span style="color:red;text-weight:bold;text-align:center;">Error with the copy</span>';
    }
	finally {
    // Chiudi il popup dopo l'operazione
	setTimeout(function() {
    window.close();
	}, 2000); // 2 secondi
  }
  }
});

