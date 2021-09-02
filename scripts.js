// SELECTORS
const countriesElement = document.getElementById("countries");
const filterButton = document.getElementById("dropdownFilter");
const searchCountry = document.getElementById("searchInput");
const regionFilter = filterButton.querySelectorAll("li");
const detailPage = document.getElementById("detailPage");
const backBtn = document.getElementById("backBtn");

fetchCountries();

/* Fetch */

async function fetchCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await response.json();

  showCountries(countries);
}

// Countries Component
function showCountries(countries) {
  countries.forEach((country) => {
    const countryElement = document.createElement("div");
    countryElement.classList.add("card");

    countryElement.innerHTML = `
    <div>
    <img src="${country.flag}" alt="Turkey" />
    </div>
    <div class="card-content">
      <h3 class="country-name">${country.name}</h3>
      <p><strong>Population:</strong>${country.population}</p>
      <p class="country-region"><strong>Region:</strong>${country.region}</p>
      <p><strong>Capital:</strong>${country.capital}</p>
    </div>

  `;

    // Detail page Visibility
    countryElement.addEventListener("click", () => {
      detailPage.style.display = "flex";
      showDetails(country);
    });

    countriesElement.appendChild(countryElement);
  });
}

//DETAIL PAGE DATAS

function showDetails(country) {
  const detailPageContent = detailPage.querySelector(".detail-content");
  const detailCountryImg = detailPage.querySelector("img");

  detailCountryImg.src = country.flag; //img'ı getirdik.

  detailPageContent.innerHTML = `
  <h3>${country.name}</h3>
  <p><strong>Native Name:</strong>${country.nativeName}</p>
  <p><strong>Population:</strong>${country.population}</p>
  <p><strong>Region:</strong>${country.region}</p>
  <p><strong>Sub Region:</strong>${country.subregion}</p>
  <p><strong>Capital:</strong>${country.capital}</p>
  <p><strong>Top Level Domain:</strong>${country.topLevelDomain[0]}</p>
  <p><strong>Currencies:</strong>${country.currencies.map(
    (currency) => currency.code
  )}</p>
  <p><strong>Languages:</strong>${country.languages.map(
    (language) => language.name
  )}</p>

  `;
}

// Dropdown Filter Click Event
filterButton.addEventListener("click", () => {
  filterButton.classList.toggle("open");
});

// Back Button Back Event
backBtn.addEventListener("click", () => {
  detailPage.style.display = "none";
});

// Search Country

searchCountry.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");

  countryName.forEach((name) => {
    console.log(name.innerText);
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      //card'ın içine giriyoruz, daha sonra card-content'in içine giriyoruz ve card-name'i bastırıyoruz.
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// Region Filter

regionFilter.forEach((filter) => {
  filter.addEventListener("click", () => {
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (
        region.innerText.toLowerCase().includes(filter.innerText.toLowerCase())
      ) {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
