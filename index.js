let getCompanies = function () {
  let url = 'https://api-v2.themuse.com/companies?page=0';
  return fetch(url).then(res => {
    return res.json();
  });
};

let getJobs = function () {
  let url = 'https://api-v2.themuse.com/jobs?page=0';
  return fetch(url).then(res => {
    return res.json();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  var companySelect = document.getElementById('company-select');
  console.assert(companySelect);

  getCompanies().then(json => {
    for (let company of json.results) {
      var select = document.createElement('option');
      select.textContent = company.name;
      companySelect.appendChild(select);
    }
  });
}, false);
