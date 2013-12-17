
# event-tracker

  Track DOM events using your favourite analytics service.

  You can pass the analytics callback once and track first or all occurrences of the given event.

## Installation

  Install with [component(1)](http://component.io):

    $ component install redbadger/event-tracker

## API

  Tracker is assigned to a set of elements and events like so

  ```js
  track = require('event-tracker')

  var callback = function(element, first, second, third) {
    _gaq.push(['_trackEvent', first, second, third]);
  }

  track('a.tracked').all('click', 'arguments', 'for', 'callback', 'and more').using(callback);
  track('input')
    .first('change', 'Forms', 'Fill_In')
    .using(callback);
  ```

## License

  MIT
