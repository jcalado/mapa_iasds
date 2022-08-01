export function getPersonsList() {
  return fetch(
    "https://infoupasd.app.adventistas.org.pt/v1/react/persons.php"
  ).then((data) => data.json());
}

export function getPerson(id) {
  return fetch(
    `https://infoupasd.app.adventistas.org.pt/v1/react/persons.php?id=${id}`
  ).then((data) => data.json());
}
