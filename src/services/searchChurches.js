export function searchChurchesList(address) {
  return fetch(
    `https://api.adventistas.pt/igrejas?morada=${address}`
  ).then((data) => data.json());
}