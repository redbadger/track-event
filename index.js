var events = require('event');
var qwery = require('qwery');
var each = require('each');

module.exports = track;

function Tracker(elements) {
  this.targets = elements;
  this.type = null
  this.event = null;
  this.args = [];
  this.live = false;
}

Tracker.prototype.first = function() {
  var args = Array.prototype.slice.call(arguments, 0)

  args.splice(0, 0, 'first');
  return this.setup.apply(this, args);
};

Tracker.prototype.all = function() {
  var args = Array.prototype.slice.call(arguments, 0)

  args.splice(0, 0, 'all');
  return this.setup.apply(this, args);
};

Tracker.prototype.using = function(cb) {
  this.callback = cb;
  this.live = true;

  var self = this;
  each(this.targets, function(target) {
    events.bind(target, self.event, function(e) {
      self.handle.call(self, e, target, callback);
    });
  });
};

// private api

Tracker.prototype.setup = function() {
  var args = Array.prototype.slice.call(arguments, 0)

  this.type = args[0];
  this.event = args[1];
  this.args = args.slice(2);

  return this;
};

Tracker.prototype.handle = function(e, target, callback) {
  if(!this.live)
    return;

  var args = this.args.slice(0);
  args.splice(0, 0, target);

  callback.apply(target, args);

  if(this.type == 'first')
    this.live = false;
};

function track(selector) {
  var elements = qwery(selector);

  return new Tracker(elements);
}