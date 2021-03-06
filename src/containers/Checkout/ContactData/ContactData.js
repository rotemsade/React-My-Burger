import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid name!",
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid email!",
        valid: false,
        touched: false
      },
      mobile: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Mobile Number"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid phone number!",
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid street name!",
        valid: false,
        touched: false
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid zip code!",
        valid: false,
        touched: false
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City"
        },
        value: "",
        validation: {
          required: true
        },
        validationErrMsg: "Please enter a valid city name!",
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = e => {
    e.preventDefault();
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          zip: this.state.orderForm.zip.value,
          city: this.state.orderForm.city.value
        },
        email: this.state.orderForm.email.value,
        mobile: this.state.orderForm.mobile.value
      },
      deliveryMethod: this.state.orderForm.deliveryMethod.value,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        settings: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.settings.elementType}
            elementConfig={formElement.settings.elementConfig}
            value={formElement.settings.value}
            invalid={!formElement.settings.valid}
            shouldValidate={formElement.settings.validation}
            touched={formElement.settings.touched}
            validationErrMsg={formElement.settings.validationErrMsg}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) =>
      dispatch(orderActions.purchaseBurger(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
