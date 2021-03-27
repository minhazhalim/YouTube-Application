$(document).ready(function(){
     var key = 'AIzaSyCO37EZ7e7hjkxjS9yseecizaqv4LAse7o';
     var playlistId = 'PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB';
     var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
     var options = {
          part: 'snippet',
          key: key,
          maxResults: 20,
          playlistId: playlistId,
     }
     loadVideos();
     function loadVideos(){
          $.getJSON(URL,options,function(data){
               var id = data.items[0].snippet.resourceId.videoId;
               mainVideo(id);
               resultsLoop(data);
          });
     }
     function mainVideo(id){
          $('#video').html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
     }
     function resultsLoop(data){
          $.each(data.items,function(i,item){
               var thumb = item.snippet.thumbnails.medium.url;
               var title = item.snippet.title;
               var description = item.snippet.description.substring(0,100);
               var video = item.snippet.resourceId.videoId;
               $('main').append(
                    `<article class="item" data-key="${video}">
					<img src="${thumb}" class="thumb">
					<div class="details">
						<h4>${title}</h4>
						<p>${description}</p>
					</div>
				</article>`
               );
          });
     }
     $('main').on('click','article',function(){
          var id = $(this).attr('data-key');
          mainVideo(id);
     });
});