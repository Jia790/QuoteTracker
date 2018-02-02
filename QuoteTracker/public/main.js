//Handles PUT request 
var update = document.getElementById('update');
update.addEventListener('click',function(){
    fetch('update', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'Ename': document.getElementById('EEditName').value,
          'name': document.getElementById('EditName').value,
          'quote': document.getElementById('EditQuote').value
        })
      }).then(data => {
        console.log(data);
        window.onbeforeunload = function () {
          window.scrollTo(0, 0);
        }
        window.location.reload(true);
      })
})

//Handles DELETE request
var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('delete', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': document.getElementById('EditName').value,
      'quote': document.getElementById('EditQuote').value
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data => {
    console.log(data)
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    window.location.reload(true);
  })
})
