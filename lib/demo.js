const empty = () => {
  $d('#display').removeClass('gif');
  $d('#display').removeClass('reverse-gif');
  $d('#display').removeClass('color');
  $d('body').removeClass('parent');
  $d('.buttons').children().removeClass('children');
  $d('#display').empty();
  $d('#message').empty();
}

const reverseGif = () => {
  $d('#display').empty();
  $d('#display').addClass('reverse-gif');
}

const forwardGif = () => {
  $d('#display').empty();
  $d('#display').addClass('gif');
}

document.addEventListener('DOMContentLoaded', () => {
  //make AJAX call to Giphy
  $d('#ajax').on('click', () => {
    $('#display').empty();
    $d.ajax({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/XhcSIUIkgbmuY?api_key=dc6zaTOxFJmzC',
      success: (data) => {
        return data;
      },
      error: () => {
        console.log('fail');
      }
    }).then(gif => {

      $d('#display').html(`<img id='giphy' src="${gif.data.images.original.url}"/>`);
    });
  });

  //clear display
  $d('#empty').on('click', () => {
    empty()
  });

  //append to display
  $d('#append').on('click', () => {
    $d('#display').append('DOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOM');
  });

  //add class to display
  $d('#addClass').on('click', () => {
    $d('#display').addClass('color');
  });

  //remove class
  $d('#removeClass').on('click', () => {
    $d('#display').removeClass('color');
  });

  //find
  $d('#find').on('click', () => {
    $d('span').empty();
    $d('#refresh').append('<b>Refresh</b> page for descriptions');
  });

  //add event listener
  $d('#on').on('click', () => {
    let reverse = true;
    $d('#display').empty();
    $d('#display').addClass('gif');
    $d('#message').empty()
    $d('#message').append('Click on GIF!');
    $d('#display').on('click', () => {
      if (reverse) {
        $d('#display').removeClass('gif');
        $d('#display').append('<img id="arrows" src="lib/assets/images/arrows.png"/>');
        setTimeout(reverseGif, 600);
        reverse = false;
      } else {
        $d('#display').removeClass('reverse-gif');
        $d('#display').append('<img id="arrows" src="lib/assets/images/forward.png"/>');
        setTimeout(forwardGif, 600);
        reverse = true;
      }
    });
  });

  //remove event listener
  $d('#off').on('click', () => {
    $d('#display').off('click');
    $d('#message').empty();
  });

  //parent
  $d('#parent').on('click', () => {
    $d('.all').parent().addClass('parent');
  })

  //children
  $d('#children').on('click', () => {
    $d('.buttons').children().addClass('children');
  });
});
