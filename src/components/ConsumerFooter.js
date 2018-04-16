import React from 'react'
import { Menu } from 'semantic-ui-react'

class ConsumerFooter extends React.Component {
	render() {
		return (
      <Menu
        inverted
        fixed="bottom"
        color="grey"
        secondary
        fluid
        widths={3}
        size="tiny">
        <Menu.Item name="Powered by Print To Web" />
      </Menu>
		)
	}
}

export default ConsumerFooter
