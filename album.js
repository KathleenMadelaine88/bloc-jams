var albumAdele = {
    title: 'When We Were Young',
    artist: 'Adele',
    label: 'XL Recordings',
    year: '2015',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var setSong = function(songNumber) {
    setSong = parseInt(songNumber);
    setSong = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
    + ' <td class="song-item-number" data-song-number=" ' + songNumber + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
 
var $row = $(template);
    
var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number'));
        
    if (setSong !== null) {
        var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		      currentlyPlayingCell.html(setSong);
              
    }
	if (setSong !== songNumber) {
		      // Switch from Play -> Pause button to indicate new song is playing.
		      $(this).html(pauseButtonTemplate);
		      setSong(songNumber);
              setSong = currentAlbum.songs[songNumber - 1];
              updatePlayerBarSong();
	} else if (setSong === songNumber) {
		      // Switch from Pause -> Play button to pause currently playing song.
		      $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
		      setSong = null;
              setSong = null;
	}
};

    
var onHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== setSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

var offHover = function(event) {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== setSong) {
            songNumberCell.html(songNumber);
        }
        console.log("songNumber type is " + typeof songNumber + "\n setSong type is " + typeof setSong);
    };
    
    $row find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};


var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
 
    $albumSongList.empty();
 
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, 
    }
};
                                                 
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};
                                                 
                                                 
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(setSong.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(setSong.title + " - " + currentAlbum.artist);
            
    $('.main-controls .play-pause').html(playerBarPauseButton);
};
        

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></spam></a';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var setSong = null;
var setSong = null;
var currentSoundFile = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {}
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
    
    
    var albums = [albumPicasso, albumMarconi, albumAdele]
    var index = 1;
    albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(albums[index]);
        index++;
        if (index == albums.length) {
            index = 0;
        }
    });
};


var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, setSong);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = parseInt(setSong);

    // Set a new current song
    setSong = currentSongIndex + 1;
    setSong = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = parseInt($('.song-item-number[data-song-number="' + setSong + '"]'));
    var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};



var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, setSong);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = parseInt(setSong);

    // Set a new current song
    setSong = currentSongIndex + 1;
    setSong = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = parseInt($('.song-item-number[data-song-number="' + setSong + '"]'));
    var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};




































