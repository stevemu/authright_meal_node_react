import React, { Component } from "react";
import { DropdownButton, Container, Col, Row } from "react-bootstrap";
import GenerateDropdownItem from "../../../components/GenerateDropdownItem";
import { getMenu, postOrder } from "../../../utils";

import styles from './OrderSummary.css.js'
import CheckoutButton from '../../../components/Button/CheckoutButton'

class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.handleSelectQuantityChange = this.handleSelectQuantityChange.bind(
      this
    );
    this.getSubtotal = this.getSubtotal.bind(this);
  }

  // A method to update the item price based on its quantity
  updateItemPrice(price, quantity) {
    return (price * quantity).toFixed(2);
  }

  handleSelectQuantityChange(quantity, e, itemId) {
    // sent back the updated quantity to API
    // console.log(itemId, quantity);
    // await postOrder(quantity, itemId);

    // update the quantity in the data
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode.key);
    this.props.handleOnSelectQuantity(quantity, itemId);
  }

  // calculate the subtotal price here
  getSubtotal(items) {
    let total = 0;
    items.forEach(element => {
      total += element.price * element.quantity;
    });
    return total;
  }

  // poll menu data
  async componentDidMount() {
    let data = await getMenu();
    this.setState({
      menu: data
    });
  }

  render() {
    const orderItems = this.props.orderItems;
    // const menu = this.props.menu;
    const items = []; // to hold JSX

    // const orderSummary = [];
    // get the ordered foods from the menu collections with itemId
    // menu.forEach(item => {
    //   orderItem.forEach(el => {
    //     if (item.itemId === el.itemId) {
    //       orderSummary.push({ _id: el._id, ...item, quantity: el.quantity });
    //     }
    //   });
    // });

    orderItems.forEach(element => {
      items.push(
        <div key={element.itemId}>
          <div style={{ display: "flex", marginBottom: "2%" }}>
            <Container>
              <Row>
                <Col sm={2}>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={element.quantity}
                    size="sm"
                  >
                    {/* <Dropdown.Item>Remove</Dropdown.Item><Dropdown.Divider /> */}
                    <GenerateDropdownItem
                      id={element.itemId}
                      onSelect={this.handleSelectQuantityChange}
                    />
                  </DropdownButton>
                </Col>
                <Col sm={8}>{element.name}</Col>
                <Col sm={2}>
                  {"$"}
                  {this.updateItemPrice(element.price, element.quantity)}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    });

    return (
      <>
        <div style={styles.summary}>
          <div>
            Subtotal
          </div>
          <div>
            {"$"}{this.getSubtotal(orderItems)}
          </div>
        </div>
        <div style={styles.items}>
          {items}
        </div>
        <CheckoutButton />
      </>
    );
  }
}


export default OrderSummary;