var events = require('event');
var qwery = require('qwery');
var each = require('each');

module.exports = track;

function Tracker(elements) {
  this.config = []
  this.targets = elements;
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
  var self = this;
  each(this.config, function(cfg) {
    each(self.targets, function(target) {
      var handler = function(e) {
        self.handle.call(self, handler, cfg, target, cb);
      };

      events.bind(target, cfg.event, handler);
    });
  });
};

// private api

Tracker.prototype.setup = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var config = {type: args[0], event: args[1], args: args.slice(2)};

  this.config.push(config);

  return this;
};

Tracker.prototype.handle = function(handler, config, target, callback) {
  var args = config.args.slice(0);
  args.splice(0, 0, target);

  callback.apply(target, args);

  if(config.type == 'first')
    events.unbind(target, config.event, handler);
};

function track(selector) {
  var elements = qwery(selector);

  return new Tracker(elements);
}