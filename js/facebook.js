/*
 * Initialize Facebook
 */
FB.init({
  appId      : '282688328557119',
  status     : true, // check login status
  cookie     : true, // enable cookies to allow the server to access the session
  xfbml      : true  // parse XFBML
});

// Subscribe to response event, set loggedIn state
FB.Event.subscribe('auth.authResponseChange', function(response) {
  if (response.status === 'connected') {
    ReinRaus.state.attr('loggedIn', true);
  }
});
