import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "Unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((er) => console.err(er));
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="w-1/2 mx-auto p-6 border mb-10"
    >
      <div className="text-center  mb-9">
        <h2 className="text-4xl font-semibold">
          You are about to order: {title}
        </h2>
        <h2 className="text-3xl">Price: {price}</h2>
      </div>

      <div className="  grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="input input-bordered input-warning w-full "
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="input input-bordered input-warning w-full "
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          required
          className="input input-bordered input-warning w-full "
        />
        <input
          type="text"
          name="email"
          required
          placeholder="Your email"
          className="input input-bordered input-warning w-full"
          defaultValue={user?.email}
          readOnly
        />
      </div>
      <textarea
        name="message"
        required
        className="textarea textarea-warning h-24 w-full my-4"
        placeholder="Your Message"
      ></textarea>

      <input
        className="btn btn-warning"
        type="submit"
        value="Place Your Order"
      />
    </form>
  );
};

export default Checkout;
