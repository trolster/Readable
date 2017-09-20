import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Grid, Button, Sidebar } from "semantic-ui-react";

class Navigation extends Component {
  state = {
    visible: false
  };
  toggleNavbar = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
      <Grid>
        <Grid.Row only="tablet computer">
          <Grid.Column>
            <Menu secondary style={{ padding: 10 }}>
              <Menu.Item as="a" name="Home" href="/">
                Readable
              </Menu.Item>
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
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row only="mobile">
          <Grid.Column>
            <Menu secondary style={{ padding: "10px 0 0 10px" }}>
              <Menu.Item>
                <Button icon="content" onClick={() => this.toggleNavbar()} />
              </Menu.Item>
            </Menu>
            <Sidebar
              as={Menu}
              vertical
              animation="overlay"
              direction="left"
              visible={this.state.visible}
              secondary
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: "2em 1em"
              }}
              onClick={() => this.toggleNavbar()}
            >
              <Menu.Item as="a" name="Home" href="/">
                Readable
              </Menu.Item>
              <Menu.Header>Select Category</Menu.Header>
              {this.props.categories.map(category => (
                <Menu.Item
                  key={category.name}
                  as="a"
                  href={`/${category.name}`}
                  content={category.name}
                  active={this.props.activeCategory === category.name}
                />
              ))}
            </Sidebar>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(state => state)(Navigation);
