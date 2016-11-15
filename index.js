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

class JobResults {
  constructor(elem) {
    console.assert(elem);
    this.elem = elem;
  }
  add(jobName) {
    var div = document.createElement('div');
    div.textContent = jobName;
    this.elem.appendChild(div);
  }
  clear() {
    while (this.elem.hasChildNodes()) {
      this.elem.lastChild.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var companySelect = document.getElementById('company-select');
  console.assert(companySelect);

  var searchBtn = document.getElementById('search-btn');
  console.assert(searchBtn);

  var jobResults = new JobResults(document.getElementById('job-results'));

  getCompanies().then(json => {
    for (let company of json.results) {
      var select = document.createElement('option');
      select.textContent = company.name;
      companySelect.appendChild(select);
    }
  });

  searchBtn.addEventListener('click', () => {
    jobResults.clear();
    getJobs().then((json) => {
      for (let job of json.results) {
        jobResults.add(job.name);
      }
    });
  });
}, false);
