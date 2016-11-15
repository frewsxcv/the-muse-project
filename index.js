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
