var Helper = {
  // Picks random element from array
  randomElement: function(array) {
    var random = Math.floor((Math.random() * array.length));
    return user = array[random];
  }
};


Voter = can.Control.extend({
  init: function(){

    var self = this;
    self.state = ReinRaus.state;

    self.usedPhotos = [];

    this.element.html(can.view('js/views/voterView.mustache', self.state));

    self.state.bind('loggedIn', function(ev, newVal, oldVal) {
      if(newVal) {
        self.getRandomImage();
      }
    });
  },

  /*
   * Events
   */
  '#rein click': function() {
    $.post('/backend.php', {user: ReinRaus.state.attr('currentUser').id, rein: true});
    ReinRaus.state.attr('reinCount', ReinRaus.state.attr('reinCount') + 1);
    ReinRaus.voter.getRandomImage.apply(ReinRaus.voter);
  },

  '#raus click': function() {
    $.post('/backend.php', {user: ReinRaus.state.attr('currentUser').id, raus: true});
    ReinRaus.state.attr('rausCount', ReinRaus.state.attr('rausCount') + 1);
    ReinRaus.voter.getRandomImage.apply(ReinRaus.voter);
  },

  '#next click': function() {
    ReinRaus.voter.getRandomImage.apply(ReinRaus.voter);
  },

  /*
   * Get a random image
   */
  getRandomImage: function() {

    if(this.friends) {
      this._getRandomImage();
    } else {
      this.attachEvents();
      this.getFriends(this._getRandomImage);
    }
  },

  _getRandomImage: function(user) {

    this.state.attr('loading', true);

    var self = this;

    // Make sure we got no user that has no photos
    do {
      var user = Helper.randomElement(this.friends);
    } while(user.noPhotos === true);

    if(user.photos) {
      // Make sure we got no photo that was already used
      do {
        var photo = Helper.randomElement(user.photos);
      } while(self.usedPhotos.indexOf(photo.id) !== -1);
      self.setPhoto.call(self, photo, user);
    } else {
      FB.api('/' + user.id + '/photos?fields=id,source', function(response) {
        user.photos = response.data
           , photo = Helper.randomElement(user.photos);

        // If no photo was found or photo was already used
        if(!photo || self.usedPhotos.indexOf(photo.id) !== -1) {
          // we mark user and call function recursivly
          user.noPhotos = !photo;
          return self._getRandomImage();
        }
        self.setPhoto.call(self, photo, user);
      });
    }
  },

  setPhoto: function(photo, user) {
    this.state.attr('currentPhoto', photo);
    this.state.attr('currentUser', user);
    this.state.attr('link', photo.source);
    this.usedPhotos.push(photo.id);
  },

  /*
   * Additional helpers
   */
  attachEvents: function() {
    var self = this;
    $('#img').load(function() {
      self.state.attr('loading', false);
    });
  },

  getFriends: function(cb) {
    var self = this;

    FB.api('/me/friends', function(response) {
      self.friends = response.data;
      cb.apply(self);
    });
  }
});
