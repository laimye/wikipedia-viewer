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

function displayArticles(articles) {
  for(var i = articles.length-1; i >= 0; i--) {
    $("#search-results").prepend(`
    <div class="col-sm-4 my-2" style="height: 10rem;">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${articles[i].header}</h5>
          <p class="card-text">${articles[i].description}</p>
          <a href=${articles[i].link} class="card-link">Learn More</a>
        </div>
      </div>
    </div>
    `)          
  }
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
