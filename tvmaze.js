/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data. res.data.

  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  return res.data
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    console.log(show)
    // console.log(shows.show.id)
    // console.log(show.name)
    // console.log(shows.show.image)
    let decider = show.show.image.medium
    let file = '';
    if(decider != null){
      file = show.show.image.medium
    }else{
      file = "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"
    }
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.show.name}</h5>
             <p class="card-text">${show.show.summary}</p>
             <img class="img infor" src="${file}">
           </div>
           <input type="button" value="Episodes" data-show-id="${show.show.id}" id="open-Episodes">
         </div>
       </div>
      `);

      $('#open-Episodes').on('click', function (){
        let event = $('#open-Episodes').data('show-id')
    
        getEpisodes(event)
    
    })

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  
  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let showList = await searchShows(query);
    populateShows(showList);
});



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const $card = $('.card')
  let list = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  console.log(list)
  $('#open-Episodes').after('<ul id="listedEpi">Episode List</ul>')
  for(let show of list.data){
      let $item = $(
        `<li id='${show.id}'>Name:${show.name} <br>Season: ${show.season}</li>`
      )
      $('#listedEpi').append($item)
  }
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}
