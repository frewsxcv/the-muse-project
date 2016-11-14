fetch('https://api-v2.themuse.com/jobs?page=0').then(res => {
  return res.json();
}).then(json => {
  console.log(json);
});
