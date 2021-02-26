const fetch = require('node-fetch');

function fetchCategoryData(category) {
  return fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${category}`)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => { throw error; });
}

function fetchItemData(item) {
  return fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${item}`)
    .then((response) => response.json())
    .then((data) => (data))
    .catch((error) => { throw error; });
}

module.exports = { fetchCategoryData, fetchItemData };
