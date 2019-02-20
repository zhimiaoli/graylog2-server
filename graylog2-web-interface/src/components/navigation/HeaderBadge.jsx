import React from 'react';
import createReactClass from 'create-react-class';
import Reflux from 'reflux';
import CombinedProvider from "injection/CombinedProvider";
import { Badge } from 'react-bootstrap';
import AppConfig from 'util/AppConfig';
import badgeStyles from 'components/bootstrap/Badge.css';

const { ConfigurationsActions, ConfigurationsStore } = CombinedProvider.get('Configurations');

const HeaderBadge = createReactClass({
  displayName: 'HeaderBadge',
  mixins: [Reflux.connect(ConfigurationsStore)],


  componentDidMount() {
    ConfigurationsActions.list(this.CUSTOMIZATION_CONFIG);
  },

  CUSTOMIZATION_CONFIG: 'org.graylog2.configuration.Customization',

  _getConfig(configType) {
    if (this.state.configuration && this.state.configuration[configType]) {
      return this.state.configuration[configType];
    }
    return null;
  },

  render() {
    const config = (this.state.configuration || {})[this.CUSTOMIZATION_CONFIG];
    const badgeEnabled = config && config.badge_enable;

    const devBadge = AppConfig.gl2DevMode() ?
      <Badge className={badgeStyles.badgeDanger}>DEV</Badge> :
      null;

    if (!badgeEnabled) {
      return devBadge || null;
    }
    return (<Badge style={{ backgroundColor: config.badge_color }}>{config.badge_text}</Badge>);
  },
});

export default HeaderBadge;
