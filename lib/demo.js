const empty = () => {
  $d('#display').empty();
}

document.addEventListener('DOMContentLoaded', () => {
  //make AJAX call to Giphy
  $d('#ajax').on('click', () => {
    empty();
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

      $d('#display').html(`<img src="${gif.data.images.original.url}"/>`);
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
});
