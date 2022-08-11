const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  const fields = ['name', 'capital', 'population', 'flags', 'languages'];

  return fetch(`${URL}${name}?fields=${fields.join(',')}`)
    .then(response => response.json())
    .catch(error => {
      alert(error);
    });
}
