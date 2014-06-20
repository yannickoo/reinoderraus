// Application singleton, prevent pollution of global namespace
ReinRaus = {
  createViews: function() {
    this.login = new Login('#login');
    this.voter = new Voter('#voter');
  },
  state: new can.Map({
    loggedIn: false,
    link: '',
    loading: true
  })
};

// Lets get the party started
$(function() {
  ReinRaus.createViews();
});
