Counter = can.Control.extend({
  init: function() {

    var self = this;
    this.element.html(can.view('js/views/counterView.mustache', ReinRaus.state));
  }
});
