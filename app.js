$(document).ready(function() {
  $('#search-button').click(handleClick); 
});

function handleClick() {
  var searchTerm = $('#user-input').val();
  var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`;
  
  $.ajax({
    type: 'GET',
    url: url,
    dataType: "JSONP",
    success: function(data) {
      $('#user-input').val('');
      $('#search-results').empty();
      var articles = formatArticles(data);
      displayArticles(articles);
    },
    error: function(error) {
      alert("Error");
      console.log(error.message);
    }
  })
}

function formatArticles (rawArticles) {
  var headers = rawArticles[1];
  var descriptions = rawArticles[2];
  var links = rawArticles[3];
  var formatedArticles = [];
  for (var i = 0; i < headers.length; i++) {
    var article = {};
    article.header = headers[i];
    article.description = descriptions[i];
    article.link = links[i];
    formatedArticles.push(article);
  }
  return formatedArticles;
}

function displayArticles(articles) {
  for(var i = articles.length-1; i >= 0; i--) {
    createElement('div', { class: 'card-body mx-5' }, [
      ['h5', { class: 'card-title' }, [articles[i].header]], 
      ['p', { class: 'card-text' }, [articles[i].description]], 
      ['a', { href: articles[i].link, class: 'btn btn-secondary', target: 'blank' }, ['Learn More']]
    ])
  }
}

function createElement(tagName, attributes, children) {
  var newCard = document.createElement('div');
  newCard.setAttribute('class', 'card my-2');
  document.getElementById('search-results').appendChild(newCard);  
  var newElement = document.createElement(tagName);
  if (children[0] instanceof Object) {
    for (var i = 0; i < children.length; i++) {
      console.log(children[i][2]);
      createElement(children[i][0], children[i][1], children[i][2]);
    }
  } else {
    var newContent = document.createTextNode(children);
    newElement.appendChild(newContent);
    newCard.appendChild(newElement);
    for (var attr in attributes) {
      newElement.setAttribute(attr, attributes[attr]);
    }
  }
}
