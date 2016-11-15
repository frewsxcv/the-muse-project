class TheMuse {
  static apiCall(url) {
    return fetch(url + 'page=0').then(res => {
      return res.json();
    }).then(json => {
      if (json.page_count === 1) {
        return json.results;
      }
      const pageCount = json.page_count > 5 ? 5 : json.page_count;
      let promises = [];
      for (let i = 1; i < pageCount; i++) {
        promises.push(fetch(url + `page=${i}`));
      }
      return Promise.all(promises).then(responses => {
        const jsonPromises = responses.map(n => n.json());
        return Promise.all(jsonPromises);
      }).then(jsons => {
        let results = jsons.map(n => n.results);
        return [].concat.apply(json.results, results);
      });
    });
  }
  static getCompanies() {
    const url = 'https://api-v2.themuse.com/companies?';
    return TheMuse.apiCall(url);
  }
  static getJobs(companies, level) {
    let url = `https://api-v2.themuse.com/jobs?`;
    if (level) {
      url += `level=${level}&`;
    }
    if (companies) {
      for (let company of companies) {
        url += `company=${company}&`;
      }
    }
    return TheMuse.apiCall(url);
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
    const select = document.createElement('option');
    select.setAttribute('value', window.encodeURIComponent(companyName));
    select.textContent = companyName;
    this.elem.appendChild(select);
  }
  getSelected() {
    let selectedOptions = Array.prototype.slice.call(this.elem.selectedOptions);
    return selectedOptions.map(n => n.value);
  }
}

class SearchButton {
  constructor(elem) {
    console.assert(elem);
    this.elem = elem;
    this.handlers = [];
    this.elem.addEventListener('click', () => {
      for (let func of this.handlers) {
        func();
      }
    });
  }
  onClick(func) {
    this.handlers.push(func);
  }
}

class JobResults {
  constructor(elem) {
    console.assert(elem);
    this.elem = elem;
  }
  add(jobName, jobLink) {
    console.assert(jobName.length);
    console.assert(jobLink.length);
    const div = document.createElement('div');
    const a = document.createElement('a');
    a.setAttribute('href', jobLink);
    a.setAttribute('target', '_blank');
    a.textContent = jobName;
    div.appendChild(a);
    this.elem.appendChild(div);
  }
  clear() {
    while (this.elem.hasChildNodes()) {
      this.elem.lastChild.remove();
    }
  }
  indicateEmpty() {
    var div = document.createElement('div');
    div.textContent = 'No jobs found! Try again!';
    this.elem.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var levelSelect = new LevelSelect(document.getElementById('level-select'));
  var companySelect = new CompanySelect(document.getElementById('company-select'));
  var searchButton = new SearchButton(document.getElementById('search-btn'));
  var jobResults = new JobResults(document.getElementById('job-results'));

  TheMuse.getCompanies().then(companies => {
    for (let company of companies) {
      companySelect.add(company.name);
    }
  });

  searchButton.onClick(() => {
    jobResults.clear();
    const companies = companySelect.getSelected();
    const level = levelSelect.getSelected();
    TheMuse.getJobs(companies, level).then(jobs => {
      if (jobs.length) {
        for (let job of jobs) {
          jobResults.add(job.name, job.refs.landing_page);
        }
      } else {
        jobResults.indicateEmpty();
      }
    });
  });
}, false);
