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
  for (var i = 0; i < articles.length; i++) {
    var $article = renderArticle(articles[i]);
    document.getElementById('search-results').appendChild($article);
  }
  return $article;
}

function renderArticle(article) {
  var $article =
    createElement('div', { class: 'card my-3' }, [
      createElement('div', { class: 'card-body' }, [
        createElement('h5', { class: 'card-title' }, [article.header]),
        createElement('p', { class: 'card-text' }, [article.description]),
        createElement('a', { href: article.link, class: 'btn btn-outline-success', target: 'blank' }, ['Learn More']),
      ])
    ]);
  return $article;
}

function createElement(tagName, attributes, children) {
  var $element = document.createElement(tagName);
  for (var attr in attributes) {
    $element.setAttribute(attr, attributes[attr])
  }
  for (var i = 0; i < children.length; i++) {
    if (children[i] instanceof Node) {
      $element.appendChild(children[i]);
    } else {
      var $text = document.createTextNode(children[i]);
      $element.appendChild($text);
    }
  }
  return $element;
}
