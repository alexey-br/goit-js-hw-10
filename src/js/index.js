import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import {
  createCuntriesListMarkup,
  createCuntryInfoMarkup,
} from './createMarkup';

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
    clearCountryInfo();
    return;
  }

  fetchCountries(searchText)
    .then(result => {
      if (result.length > 10) {
        clearCuntriesList();
        clearCountryInfo();
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else if (result.length === 1) {
        clearCuntriesList();
        renderCountryInfo(result);
      } else if (result.length <= 10) {
        clearCountryInfo();
        renderCountriesList(result);
      }
    })
    .catch(() => {
      clearCuntriesList();
      clearCountryInfo();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  refs.countryInfo.innerHTML = createCuntryInfoMarkup(countries);
}

function renderCountriesList(countries) {
  refs.countryList.innerHTML = createCuntriesListMarkup(countries);
}

function clearCuntriesList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
