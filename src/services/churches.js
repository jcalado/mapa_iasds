export function getChurchesList() {
    return fetch('https://infoupasd.app.adventistas.org.pt/v1/react/churches.php')
      .then(data => data.json())
  }