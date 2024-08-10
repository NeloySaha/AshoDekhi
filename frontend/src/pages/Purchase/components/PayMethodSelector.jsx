import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "../../../reducers/cartSlice";

export const PayMethodSelector = ({ paymentOngoing }) => {
  const { payment_method: userPayMethod } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

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
              disabled={paymentOngoing}
              type="radio"
              id={1}
              name="Select Payment"
              value="Bkash"
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              checked={"Bkash" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={1}>
              Bkash
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Nagad"
            style={checkedColor("Nagad")}
          >
            <input
              disabled={paymentOngoing}
              type="radio"
              id={2}
              name="Select Payment"
              value="Nagad"
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              checked={"Nagad" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={2}>
              Nagad
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Credit Card"
            style={checkedColor("Credit Card")}
          >
            <input
              disabled={paymentOngoing}
              type="radio"
              id={3}
              name="Select Payment"
              value="Credit Card"
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              checked={"Credit Card" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={3}>
              Credit Card
            </label>
          </div>

          <div
            className="pay-input-container"
            key="Debit Card"
            style={checkedColor("Debit Card")}
          >
            <input
              disabled={paymentOngoing}
              type="radio"
              id={4}
              name="Select Payment"
              value="Debit Card"
              onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              checked={"Debit Card" === userPayMethod}
            />

            <label className="form-pay-detail" htmlFor={4}>
              Debit Card
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
