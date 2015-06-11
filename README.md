# pandapush-react

[https://www.github.com/neilgupta/pandapush-react](https://www.github.com/neilgupta/pandapush-react)

Pandapush is an event push system similar to Pusher for internal Instructure use.

## Installing

```
npm install pandapush-react
```

## Example

```javascript
var React = require('react');
var Pandapush = require('pandapush-react');

var App = React.createClass({
  handlePandapush (message) {
    console.log("Received " + message);
  },

  render: function () {
    <Pandapush 
      onReceive={ this.handlePandapush } 
      channelName="hello"
      token="sadih1iu2he12h"
      appId="PSIDv4ADyV6V9fQ2BgJZ"
      isPublic={ false }
    />
  }
});

React.render(<App/>, document.getElementById('container'));
```

## Usage

The `Pandapush` component accepts the following props:

### onReceive

A required callback function that accepts a message object received from Pandapush.

### channelName

A required string for the name of the channel to join.

### appId

A required string for your Pandapush App ID. This is optional if you store the app id in `window.pandapushAppId` instead.

### isPublic

An optional boolean for whether this is a public or private channel. Defaults to true.

### token

An optional string for passing the token needed to join a private channel. This is required if `isPublic` is `false`.

### url

An optional string for overriding the default Pandapush server url. This should probably never be used.

## Author

Neil Gupta [http://metamorphium.com](http://metamorphium.com)

## License

The MIT License (MIT) Copyright (c) 2015 Neil Gupta. See [MIT-LICENSE](https://raw.github.com/neilgupta/pandapush-react/master/MIT-LICENSE)
