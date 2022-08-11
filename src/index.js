import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: window['search-box'],
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const searchText = e.target.value.trim();

  if (searchText === '') {
    clearCuntriesList();
    return;
  }

  fetchCountries(searchText)
    .then(result => {
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else if (result.length <= 10) {
        clearCountryInfo();
        renderCountries(result);
      } else if (result.length === 1) {
        clearCuntriesList();
        renderCountryInfo(result);
      }
    })
    .catch(error => {
      alert(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  refs.countryList.innerHTML = createCuntryInfoMarkup(countries);
}

function renderCountries(countries) {
  refs.countryList.innerHTML = createCuntriesMarkup(countries);
}

function createCuntriesMarkup(cuntries) {
  return cuntries.reduce((acc, country) => {
    const {
      name: { official: name },
      flags: { svg: flag },
    } = country;
    return `${acc} <li class="country-item"><img class="country-flag" src="${flag}" alt="flag of ${name}"><span class="county-name">${name}</span></li>`;
  }, '');
}

function createCuntryInfoMarkup(cuntry) {
  const {
    name: { official: name },
    capital,
    population,
    flags: { svg: flag },
    languages,
  } = cuntries;
}

function clearCuntriesList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
