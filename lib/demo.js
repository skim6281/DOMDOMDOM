document.addEventListener('DOMContentLoaded', () => {
  //make AJAX call to Giphy
  $d('#ajax').on('click', () => {
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
    $d('#display').empty();
  });

  $d('#append').on('click', () => {
    $d('#display').append('DOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOMDOM');
  });
});
