/*

Kod stworzony przez Patryka Eliasza - patryk0493@gmail.com / patrykeliasz.pl
Odtwarzacz muzyki pobierający pliki lokalnie, wykorzystano animate.css, fontsAwesome jQuery, googleFonts

*/

$(document).ready(function(){
          var isPlaying = false;
          var song = document.createElement('audio');
          var curtime = 0;
          var min = 0, sec = 0;
          var isSelected = false;
          var selectedSong = null;

          // klikniecie na div z muzyką
          $('#music_divs .song').click(function() {
            selectedSong = $(this);
            if ($(this).hasClass( "selected_song" )) { // kliknieto na aktywna
              if (isPlaying) {
                song.pause();
                console.log("pause");
                isPlaying = false;
                $('#music_controls #play_pause i').removeClass('fa-play').addClass('fa-pause');
              } else { // nie odtwarze
                song.play();
                console.log("play");
                isPlaying = true;
                $('#music_controls #play_pause i').removeClass('fa-pause').addClass('fa-play');
              }
            } else { // kliknieto na niekatywna
              isSelected = true;
              if ( $('#music_divs div').hasClass( "selected_song" ) ) { //czy juz jaka została wybrana - tak
                $('#music_divs div').removeClass("selected_song");
                selectedSong.addClass("selected_song");
                if (!isPlaying)  //czy odtwarza - tak
                  $('#music_controls #play_pause i').removeClass('fa-pause').addClass('fa-play');
              } else  //czy juz jaka została wybrana - nie
                selectedSong.addClass("selected_song");
              song.setAttribute('src', selectedSong.attr('src'));
              song.setAttribute('autoplay', 'autoplay');
            }
          });
          
          $('#music_controls #prev').click(function() {
              if ( selectedSong.prev('.song').length ) { // mozna wybrac poprzednia - tak 
                
                $('#music_divs div').removeClass("selected_song");
                selectedSong.prev().addClass("selected_song");
                selectedSong = selectedSong.prev();

                song.setAttribute('src', selectedSong.attr('src'));
                song.setAttribute('autoplay', 'autoplay');  
                song.play();
                isPlaying = true;
              } else {  // mozna wybrac poprzednia - nie
                console.log("nie ma poprzedniej");
                selectedSong.addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { selectedSong.removeClass('shake animated') });
              }    
            });
          
          $('#music_controls #next').click(function() {
              if ( selectedSong.next('.song').length ) { // mozna wybrac poprzednia - tak 
                console.log("jest poprzednia:  " + selectedSong.next('.song').length);
                $('#music_divs div').removeClass("selected_song");
                selectedSong.next().addClass("selected_song");
                selectedSong = selectedSong.next();

                song.setAttribute('src', selectedSong.attr('src'));
                song.setAttribute('autoplay', 'autoplay');  
                song.play();
                isPlaying = true;
              } else {  // mozna wybrac poprzednia - nie
                selectedSong.addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() { selectedSong.removeClass('shake animated') });
                  // niec nie rób
              }    
            });
          
          song.addEventListener('loadedmetadata', function() {
                song.play(); 
                console.log("play");
                isPlaying = true;
              });
          
          var interV = setInterval(
            function(){ 
              curtime = parseInt(song.currentTime, 10);
              min = (curtime/60) << 0,
              sec = (curtime) % 60;
              $('#min').text(min);
              $('#sec').text(sec);
              $('#progress_indicator').css("left", curtime / song.duration * 100+ '%');
            }, 40);
            
          $('#music_controls #play_pause').click(function() {
              if (isPlaying) { 
                song.pause();
                console.log("pause");
                isPlaying = false;
                $(this).find('i').removeClass('fa-play').addClass('fa-pause');
              } else { 
                song.play();
                console.log("play");
                isPlaying = true;
                $(this).find('i').removeClass('fa-pause').addClass('fa-play');
              }
            }); 
        });