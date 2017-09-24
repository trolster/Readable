import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Grid } from "semantic-ui-react";

class NavBar extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row only="tablet computer">
          <Grid.Column>
            <Menu secondary style={{ padding: 10 }}>
              <Menu.Item as="a" name="Home" href="/">
                Readable
              </Menu.Item>
              {!!this.props.categories.length && (
                <Dropdown item text="Select Category">
                  <Dropdown.Menu>
                    {this.props.categories.map(category => (
                      <Dropdown.Item
                        key={category.name}
                        as="a"
                        href={`/${category.path}`}
                        active={this.props.activeCategory === category.name}
                        content={category.name}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(state => state)(NavBar);
