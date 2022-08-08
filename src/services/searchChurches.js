export function searchChurchesList(address) {
  return fetch(
    `https://api.adventistas.org.pt/igrejas/geocode.php?address=${address}`
  ).then((data) => data.json());
}