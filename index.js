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

  var searchBtn = document.getElementById('search-btn');
  console.assert(searchBtn);

  var jobResults = document.getElementById('job-results');
  console.assert(jobResults);

  getCompanies().then(json => {
    for (let company of json.results) {
      var select = document.createElement('option');
      select.textContent = company.name;
      companySelect.appendChild(select);
    }
  });

  searchBtn.addEventListener('click', () => {
    while (jobResults.hasChildNodes()) {
      jobResults.lastChild.remove();
    }
    getJobs().then((json) => {
      for (let job of json.results) {
        var div = document.createElement('div');
        div.textContent = job.name;
        jobResults.appendChild(div);
      }
    });
  });
}, false);
