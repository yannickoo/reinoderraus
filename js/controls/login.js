Login = can.Control.extend({
  init: function() {

    var self = this;
    this.element.html(can.view('js/views/loginView.mustache', ReinRaus.state));
  }
});
