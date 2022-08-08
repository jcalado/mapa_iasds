export function getChurchesList() {
    return fetch('https://api.adventistas.org.pt/igrejas/churches.php')
      .then(data => data.json())
  }