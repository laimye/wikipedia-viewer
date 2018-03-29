(function() {

    document.getElementById('search-button').addEventListener('click', handleClick);
  
    function handleClick(event) {
      var input = document.getElementById('user-input').value;
      console.log(input);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&format=json&callback=?`;
  
      xhr.addEventListener('load', function() {
        console.log(xhr.responseText);
      });
      xhr.open('GET', url);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();
    }

  })();
  