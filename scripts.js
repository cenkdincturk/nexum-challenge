// Datalari cektik ve render ettik


const countriesElement = document.getElementById("countries");
const filterButton = document.getElementById("dropdownFilter")

fetchCountries();

async function fetchCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await response.json(); /* Fetch islemi*/

  showCountries(countries);
}

function showCountries(countries) {
  countries.forEach((country) => {
    const countryElement = document.createElement("div");
    countryElement.classList.add("card");

    countryElement.innerHTML = `
    <div>
    <img src="${country.flag}" alt="Turkey" />
    </div>
    <div class="card-content">
      <h2>${country.name}</h2>
      <p><strong>Population:</strong>${country.population}</p>
      <p><strong>Region:</strong>${country.region}</p>
      <p><strong>Capital:</strong>${country.capital}</p>
    </div>

  `;

    countriesElement.appendChild(countryElement);
  });
}


filterButton.addEventListener("click", () => {
    filterButton.classList.toggle("open");
})