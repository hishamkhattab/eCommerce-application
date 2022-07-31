import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CountryDropdown } from "react-country-region-selector";
import "./style.scss";

const initAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const CARD_OPTIONS = {
  iconeStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open_Sans",
      fontSmoothing: "antialiased",
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function PurchaseForm() {
  const { cart } = useSelector((state) => state.carts);
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [billingAddress, setBillingAddress] = useState({ ...initAddress });
  const [shippingAddress, setShippingAddress] = useState({ ...initAddress });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  // useEffect(() => {
  //   if (cart.length < 1) {
  //     navigate("/");
  //   }
  // }, [cart.length, navigate]);

  // const handlePaymentForm = async (e) => {
  //   e.preventDefault();

  //   const CardElement = elements.getElement("card");

  //   if (
  //     !shippingAddress.line1 ||
  //     !shippingAddress.city ||
  //     !shippingAddress.state ||
  //     !shippingAddress.postal_code ||
  //     !shippingAddress.country ||
  //     !billingAddress.line1 ||
  //     !billingAddress.city ||
  //     !billingAddress.state ||
  //     !billingAddress.country ||
  //     !billingAddress.postal_code ||
  //     !recipientName ||
  //     !nameOnCard
  //   ) {
  //     console.log();
  //   }

  //   apiInstatance
  //     .post("/payments/create", {
  //       amount: total * 100,
  //       shipping: {
  //         name: recipientName,
  //         address: {
  //           ...shippingAddress,
  //         },
  //       },
  //     })
  //     .then(({ data: clientSecret }) => {
  //       stripe.createPaymentMethod({
  //         type: "card",
  //         card: CardElement,
  //         billing_details: {
  //           name: nameOnCard,
  //           address: {
  //             ...billingAddress,
  //           },
  //         },
  //       });
  //     })
  //     .then(({ paymentMethod }) => {
  //       stripe.confirmCardPayment(clientSecret, {
  //         payment_method: paymentMethod.id,
  //       });
  //     })
  //     .then(({ paymentIntent }) => {
  //       const configOrder = {
  //         orderTotal: total,
  //         orderItems: cardItems.map((item) => {
  //           const { documentID, productThumbnail, productName, productPrice, qty } = item;
  //           return {
  //             documentID,
  //             productThumbnail,
  //             productName,
  //             productPrice,
  //             qty,
  //           };
  //         }),
  //       };

  //       dispatch(asdasdas(configOrder));
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await fetch("http://localhost:4000/payment", {
          method: "POST",
          body: {
            amount: 10,
            id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          setSuccess(true);
          console.log("successs");
        }
      } catch (error) {
        setSuccess(false);
        console.log(`Error${error}`);
      }
    } else {
      setSuccess(false);
      console.log(error.message);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>You Just bought something</h2>
        </div>
      )}
    </>
  );
}

export default PurchaseForm;
