var reddit_response;
var afterId;
var number;

$(document).ready(function(){

  //loads first 25 posts into gallery
  getLaughs();

  //runs loadMore function when Load More button is clicked.
  //prevents page from jumping up to the top when Load More button is clicked.
  $("footer a").eq(1).click(function(event){
    event.preventDefault();
    loadMore()
  });

  //runs loadNextPage function when Next button is clicked.
  $("footer a").eq(2).click(function(){
    loadNextPage()
  });

  //runs loadPreviousPage function when Previous button is clicked.
  $("footer a").eq(0).click(function(){
    loadPreviousPage()
  });

});

//clears what's visible and loads the previous 25 
function loadPreviousPage() {
    for (i=0; i<25; i++) {
          $(".item").remove();
    }
    $.get("http://www.reddit.com/r/funny.json?count=25&before=" + reddit_response.data.before)
    .success(renderGallery)
    .fail(function(){
      alert('Something is wrong')
  })
}

//clears what's visible and loads the next 25
function loadNextPage() {
  for (i=0; i<25; i++) {
        $(".item").remove();
  }
  $.get("http://www.reddit.com/r/funny.json?count=25&after=" + reddit_response.data.after)
  .success(renderGallery)
  .fail(function(){
    alert('Something is wrong')
  })
}

//loads the next 25 articles when "Load More" button is clicked 
function loadMore() {
  $.get("http://www.reddit.com/r/funny.json?count=25&after=" + reddit_response.data.after)
  .success(renderGallery)
  .fail(function(){
    alert('Something is wrong')
  })
}

//loads the front page (first 25 articles) from reddit/r/funny 
function getLaughs() {
  // Make Api Request
  $.get("http://www.reddit.com/r/funny.json")
  // And when the reponse comes back...
  .success(function(response) {
    renderGallery(response)
  })
  .fail(function(){
    alert('Something is wrong')
  })
}

function renderGallery(response) {
  var gallery = $('#gallery');
  reddit_response = response;  
  var length = reddit_response.data.children.length // how many articles are on front page (25)

  //pulls all the article thumbnails + titles
  for (i=0; i<length; i++) {
    var item_data = reddit_response.data.children[i].data
    var item_html = (
                      "<div class='item'>" +
                      "<a href='http://www.reddit.com/" + item_data.permalink + "'>" +
                      "<p>" + item_data.title + "</p>" + // title here +
                      "<img src='" + item_data.url + "'/>" + // img here +
                      "</div>"
                    );
    // and add it to the DOM!
    gallery.append(item_html);
  }
}


