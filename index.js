var getJobs = function () {
  var url = 'https://api-v2.themuse.com/jobs?page=0';
  fetch(url).then(res => {
    return res.json();
  }).then(json => {
    console.log(json);
  });
};
