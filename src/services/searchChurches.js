export function searchChurchesList(address) {
  return fetch(
    `https://infoupasd.app.adventistas.org.pt/v1/react/geocode.php?address=${address}`
  ).then((data) => data.json());
}