var React = require("react");
var Faye = require("faye");

var PANDAPUSH_URL = "https://pp-beta.instructure.com/push";

var Pandapush = React.createClass({
  propTypes: {
    onReceive: React.PropTypes.func.isRequired,
    channelName: React.PropTypes.string.isRequired,
    isPublic: React.PropTypes.bool,
    token: React.PropTypes.string,
    appId: React.PropTypes.string,
    url: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      isPublic: true,
      appId: window.pandapushAppId,
      url: PANDAPUSH_URL
    };
  },

  getInitialState () {
    return {
      client: null,
      channelType: this.props.isPublic ? "public" : "private"
    };
  },

  channelUri () {
    return "/" + this.props.appId + "/" + this.state.channelType + "/" + this.props.channelName;
  },

  componentDidMount () {
    var client = new Faye.Client(this.props.url);

    if (this.props.token) {
      client.addExtension({
        outgoing: function(message, callback) {
          if (message.channel !== '/meta/subscribe')
            return callback(message);

          // The channel being subscribed to is stored in `message.subscription`
          // if you need to inspect it.

          message.ext = message.ext || {};
          message.ext.auth = { token: this.props.token };
          callback(message);
        }
      });
    }

    client.subscribe(this.channelUri(), this.props.onReceive);
    this.setState({client: client});
  },

  componentWillUnmount () {
    this.state.client.unsubscribe(this.channelUri());
  },

  render () {
    return false;
  }

});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Pandapush;
}
