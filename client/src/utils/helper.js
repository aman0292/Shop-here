const initializeRazorpay = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        reject(false);
      };

      document.body.appendChild(script);
    });
  };
  export const handleCheckout = async (cb) => {
    // if (checkoutDetails?.selectedAddress?._id == undefined) {
    //   showToast("Please select address first", "ERROR");
    //   return;
    // }

    const razorpayInstance = await initializeRazorpay();

    if (!razorpayInstance) {
    //   toast.error("ERROR in loading razorpay");
      return;
    }

    const options = {
      key: "rzp_test_rDqPVrQMYMnCeQ",
      image: "/hopsopLogo.png",
      name: "Shop-here",
      description: "Ecomm for travel products",
      currency: "INR",
      amount: 2000 * 100,
      handler: async function (response) {
 const { razorpay_payment_id } = await response;
        cb();
      },
      prefill: {
        name: "Aman",
        email: "singhalaman0282@gmail.com",
        contact: 7974662876,
        method: "phonepe",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };