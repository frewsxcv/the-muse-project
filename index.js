class TheMuse {
  static getCompanies() {
    let url = 'https://api-v2.themuse.com/companies?page=0';
    return fetch(url).then(res => {
      return res.json();
    });
  }
  static getJobs(companies, level) {
    let url = `https://api-v2.themuse.com/jobs?page=0`;
    if (level) {
      url += `&level=${level}`;
    }
    if (companies) {
      for (let company of companies) {
        url += `&company=${company}`;
      }
    }
    return fetch(url).then(res => {
      return res.json();
    });
  }
}

class LevelSelect {
  constructor(elem) {
    console.assert(elem);
    this.elem = elem;
  }
  getSelected() {
    return this.elem.value;
  }
}

class CompanySelect {
  constructor(elem) {
    console.assert(elem);
    this.elem = elem;
  }
  add(companyName) {
    var select = document.createElement('option');
    select.setAttribute('value', window.encodeURIComponent(companyName));
    select.textContent = companyName;
    this.elem.appendChild(select);
  }
  getSelected() {
    let selectedOptions = Array.prototype.slice.call(this.elem.selectedOptions);
    return selectedOptions.map(n => n.value);
  }
}

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
  var levelSelect = new LevelSelect(document.getElementById('level-select'));
  var companySelect = new CompanySelect(document.getElementById('company-select'));

  var searchBtn = document.getElementById('search-btn');
  console.assert(searchBtn);

  var jobResults = new JobResults(document.getElementById('job-results'));

  TheMuse.getCompanies().then(json => {
    for (let company of json.results) {
      companySelect.add(company.name);
    }
  });

  searchBtn.addEventListener('click', () => {
    jobResults.clear();
    TheMuse.getJobs(companySelect.getSelected(), levelSelect.getSelected()).then(json => {
      for (let job of json.results) {
        jobResults.add(job.name);
      }
    });
  });
}, false);
