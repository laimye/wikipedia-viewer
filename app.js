$(document).ready(function() {
  $('#search-button').click(function() {
    var searchTerm = $('#user-input').val();
    var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`;
    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      dataType: "JSON",
      success: function(data) {
        var headers = data[1];
        var descriptions = data[2];
        var link = data[3];
        console.log(data)
        for(var i = headers.length; i >= 0; i--) {
          $("#search-results").prepend(`
          <div class="col-sm-4 my-2" style="height: 10rem;">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${headers[i]}</h5>
                <p class="card-text">${headers[i]}</p>
                <a href=${headers[i]} class="card-link">Learn More</a>
              </div>
            </div>
          </div>
          `)          
        }
      },
      error: function(error) {
        alert("Error");
        console.log(error.description);
      }
    })
  })
});