import React from "react";

export const PayMethodSelector = ({
  handleUserPaymentMethod,
  userPayMethod,
}) => {
  const checkedColor = (val) => {
    return {
      backgroundColor: val === userPayMethod ? "#ef5e78" : "",
      border: val === userPayMethod ? "2px solid transparent" : "",
    };
  };
  return (
    <div>
      <form>
        <div className="form-item-heading">Select Payment Method</div>
        <div className="form-pay-options">
          <div
            className="pay-input-container"
            key="Bkash"
            style={checkedColor("Bkash")}
          >
            <input
              type="radio"
              id={1}
              name="Select Payment"
              value="Bkash"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Bkash" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={"Bkash"}>
              Bkash
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Nagad"
            style={checkedColor("Nagad")}
          >
            <input
              type="radio"
              id={2}
              name="Select Payment"
              value="Nagad"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Nagad" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={"Nagad"}>
              Nagad
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Credit Card"
            style={checkedColor("Credit Card")}
          >
            <input
              type="radio"
              id={3}
              name="Select Payment"
              value="Credit Card"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Credit Card" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={"Credit Card"}>
              Credit Card
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Debit Card"
            style={checkedColor("Debit Card")}
          >
            <input
              type="radio"
              id={4}
              name="Select Payment"
              value="Debit Card"
              onChange={(e) => handleUserPaymentMethod(e)}
              checked={"Debit Card" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={"Debit Card"}>
              Debit Card
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
