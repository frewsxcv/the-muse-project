var getJobs = function () {
  var url = 'https://api-v2.themuse.com/jobs?page=0';
  return fetch(url).then(res => {
    return res.json();
  });
};
