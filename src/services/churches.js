export function getChurchesList() {
  return fetch("https://api.adventistas.pt/igrejas").then((data) =>
    data.json()
  );
}

export function getChurch(id) {
  return fetch(`https://api.adventistas.pt/igrejas?igreja=${id}`).then((data) =>
    data.json()
  );
}
