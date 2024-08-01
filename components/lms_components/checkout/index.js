import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import get_jwt from '../../../lib/frontend_functions/get_jwt';
const RAZORPAY_KEY = "rzp_live_GXqopiJc6sryXL";
//const RAZORPAY_KEY = "rzp_test_lqzrYWr5WUy06I";

export default function Checkout({courseId, labs, change_success, course_name, course_price, coupons}) {
  
  const router = useRouter();
  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFName] = useState('');
  const [last_name, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPass] = useState('');
  const [createAcc, setCreateAcc] = useState('create');
  const [city, setCity] = useState('');
  const [coupon, setCoupon] = useState('');
  const [fprice, setFPrice] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [coupon_applied, setCApply] = useState('0');
  
  const [order_id, setOrder] = useState('');
  
  useEffect(()=>{
    setFPrice(course_price);
  },[course_price])
  
  const apply_coupon = async () => {
    setCApply("1");
     // Find the coupon in the coupons array
  const vcoupon = coupons.find(item => item.coupon === coupon);

  if (vcoupon) {
    // Valid coupon found, apply the discount to fprice
    const discount = parseInt(vcoupon.discount, 10);
    const currentFPrice = parseInt(fprice, 10);

    if (!isNaN(discount) && !isNaN(currentFPrice)) {
      // Both discount and fprice are valid integers
      const discountedPrice = currentFPrice - discount;
      // Convert the discounted price back to a string
      const discountedPriceString = discountedPrice.toString();
      setFPrice(discountedPriceString);
      toast.success("Coupon Applied!");
    }
  }
  }
  
  const verify_payment = async (order, payment_id, signature) => {
    const j = get_jwt();
    const formData = new URLSearchParams();
    formData.append('order_id', order);
    formData.append('payment_id', payment_id);
    formData.append('signature', signature);
    formData.append('mail', email);
    formData.append('token', j);
    formData.append('name', first_name);
    formData.append('course_id', courseId);
    formData.append('labs', labs);
    formData.append('user', username);
    formData.append('password', password);
    formData.append('phone', phone);
    const response = await axios.post('/api/payments/verify_payment', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
      
      if (response.status === 200 && response.data.validity) {
        // Redirect to the dashboard page upon successful authentication
        toast.success('Payment successful!!');
        change_success('success');
      } else {
        toast.error('Something wrong with your payment 🥲 Please contact us if money was deducted.');
      }
  }
  
  const createOrder = async () => {
    const formData = new URLSearchParams();
    const r = get_jwt();
    formData.append('token', r);
    //formData.append('amt', course_price);
    formData.append('amt', fprice);
    formData.append('uuid', uuidv4());
    const response = await axios.post('/api/payments/create_order', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
      
      if (response.status === 200) {
        // Redirect to the dashboard page upon successful authentication
        toast.success('Order created!!');
        //console.log(response.data)
        const od = response.data.order.id;
        setOrder(od);
        invoke_payment(od);
      } else {
        toast.error('Something went wrong with our payment server. Are you online?');
      }
  }
  
  function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
  
  const handleOrder = ((e) => {
    e.preventDefault();
    if (![username, email, first_name, last_name, phone, password, city].every(Boolean)) {
       toast.error('All fields must be filled 🥲');
       return false;
    }
    const jwt = get_jwt();
    setToken(jwt);
    if (jwt === null && createAcc === "create"){
      const r = register();
    }
    else if (jwt === null && createAcc === ""){
      const l = login();
    }
    else if(jwt){
      //console.log(jwt);
      toast.success("Loading payment...");
      createOrder();
    }
  });
  
  const invoke_payment = async (order) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Could not speak to my server. Are you online?");
      return;
    }
    else{
      const options = {
      key: RAZORPAY_KEY,
      currency: "INR",
      //amount: course_price+"00",
      amount: fprice+"00",
      order_id: order,
      name: course_name,
      description: "Avidia Labs",
      image: "https://au-spot.s3.ap-south-1.amazonaws.com/assets/logos/nvai/Avidia.png",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        //setPayment(response.razorpay_payment_id);
        //setOrder(response.razorpay_order_id);
        const sig = response.razorpay_signature;
        const pay = response.razorpay_payment_id;
        //console.log("RESPONSE"+sig);
        verify_payment(order, pay, sig);
      },
      theme: {
    color: "#e66909",
  },
      prefill: {
        name: first_name,
        email: email,
        phone_number: phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    }
  }
  
  function validateFields() {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate username
    if (username.includes(' ') || specialCharPattern.test(username)) {
        toast.error('Username should not contain spaces or special characters 🫣');
        return false;
    }

    // Validate email
    if (!emailPattern.test(email)) {
        toast.error('Invalid email address 🥹');
        return false;
    }

    //All fields are filled or not
    if (![username, email, first_name, last_name, phone, password].every(Boolean)) {
       toast.error('All fields must be filled 🥲');
       return false;
    }

    // Clear any existing error
    setError('');
    return true;
}

  const login = async() => {
    try {
      // Create form data with the username and password
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Make a POST request to your API route in the pages/api directory
      const id = toast.loading("Please wait...")
      //toast.('Checking...');
      const response = await axios.post('/api/auth', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });

      if (response.status === 200 && response.data.success) {
        // Redirect to the dashboard page upon successful authentication
        toast.update(id, { render: "Login success!", type: "success", isLoading: false });
        setError('Welcome!');
        const j = get_jwt();
        setToken(j);
        createOrder();
        //router.push('/dashboard');
      } else {
        toast.update(id, { render: "Invalid credentials 🥲", type: "error", isLoading: false });
        setError('Invalid credentials 🥲');
      }
      toast.dismiss();
    } catch (error) {
      toast.error('Please check your password and try again 🥲');
      setError('Please check your password and try again 🥲');
    }
  }
  
  const register = async () => {
    setError('');

    try {
        toast.success('Checking your details 🫣');
    //PERFORM FIELD CHECKS
    const f_check = validateFields();
    
    if(f_check) {
      toast.success('Preparing your data ✨ ')    
      // Create form data with the username and password
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('confirm_password', password);
      formData.append('email', email);
      formData.append('phone_number', phone);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);

      // Make a POST request to your API route in the pages/api directory
      const response = await axios.post('/api/user_register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
      
      if (response.status === 200 && response.data.success) {
        // Redirect to the dashboard page upon successful authentication
        toast.success('Loading payment');
        const j = get_jwt();
        //console.log(j);
        setToken(j);
        createOrder();
      } else {
        toast.error('Something wrong with AUTH server 🥲');
      }
      //setError(response.error ? error+"🥲" : 'Our AUTH server seems to be down 🥲');
}
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error+'🥲');
    }
  }
  
  return (
    <>
    <ToastContainer />
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-inner text-center">
            <h2 className="title">Checkout</h2>
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right" />
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Checkout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumb Area */}
  <div className="checkout_area bg-color-white rbt-section-gap">
    <div className="container">
      <div className="row g-5 checkout-form">
        <div className="col-lg-7">
          <div className="checkout-content-wrapper">
            {/* Billing Address */}
            <div id="billing-form">
              <h4 className="checkout-title">Your details</h4>
              <div className="row">
                <div className="col-md-6 col-12 mb--20">
                  <label>First Name*</label>
                  <input type="text" placeholder="First Name" onChange={(event) => {setFName(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12 mb--20">
                  <label>Last Name*</label>
                  <input type="text" placeholder="Last Name" onChange={(event) => {setLName(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12 mb--20">
                  <label>Email Address*</label>
                  <input type="email" placeholder="Email Address" onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12 mb--20">
                  <label>Phone no*</label>
                  <input type="text" placeholder="Phone number" onChange={(event) => {setPhone(event.target.value)}}/>
                </div>
                <div className="col-12 mb--20">
                  <label>Username*</label>
                  <input type="text" placeholder="Username" onChange={(event) => {setUser(event.target.value)}}/>
                </div>
                <div className="col-12 mb--20">
                  <label>Password*</label>
                  <input type="text" placeholder="Password" onChange={(event) => {setPass(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12 mb--20">
                  <label>Town/City*</label>
                  <input type="text" placeholder="Town/City" onChange={(event) => {setCity(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12 mb--20">
                  <label>Coupon (if any)</label>
                  <input type="text" placeholder="Coupon code" onChange={(event) => {setCoupon(event.target.value)}}/>
                   <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     coupon_applied === '0' ? apply_coupon() : toast.error("Coupon is already applied!");
                   }}>Apply Coupon<i class="feather-arrow-right"></i></a>
                </div>
                <div className="col-12 mb--20">
                  <div className="check-box">
                    <input type="checkbox" value="create" id="create_account" defaultChecked={true} onChange={(e)=>{createAcc === '' ? setCreateAcc(e.target.value) : setCreateAcc('');}}/>
                    <label htmlFor="create_account">Create an Acount?</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Shipping Address */}
            <div id="shipping-form" className="mt--20">
              <h4 className="checkout-title">Your details</h4>
              <div className="row g-5">
                <div className="col-md-6 col-12">
                  <label>First Name*</label>
                  <input type="text" placeholder="First Name" onChange={(event) => {setFName(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12">
                  <label>Last Name*</label>
                  <input type="text" placeholder="Last Name" onChange={(event) => {setLName(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12">
                  <label>Email Address*</label>
                  <input type="email" placeholder="Email Address" onChange={(event) => {setEmail(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12">
                  <label>Phone no*</label>
                  <input type="text" placeholder="Phone number" onChange={(event) => {setPhone(event.target.value)}}/>
                </div>
                <div className="col-12">
                  <label>Username*</label>
                  <input type="text" placeholder="Username" onChange={(event) => {setUser(event.target.value)}}/>
                </div>
                <div class="col-12">
                  <label>Password*</label>
                  <input type="text" placeholder="Password" onChange={(event) => {setPass(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12">
                  <label>Town/City*</label>
                  <input type="text" placeholder="Town/City" onChange={(event) => {setCity(event.target.value)}}/>
                </div>
                <div className="col-md-6 col-12">
                 <label>Coupon (if any)</label>
                  <input type="text" placeholder="Coupon code" onChange={(event) => {setCoupon(event.target.value)}}/>
                   <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     coupon_applied === '0' ? apply_coupon() : toast.error("Coupon is already applied!");
                   }}>Apply Coupon<i class="feather-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="row pl--50 pl_md--0 pl_sm--0">
            {/* Cart Total */}
            <div className="col-12 mb--60">
              <h4 className="checkout-title">Cart Total</h4>
              <div className="checkout-cart-total">
                <h4>
                  Product <span>Total</span>
                </h4>
                <ul>
                  <li>
                    {course_name+" "} <span>₹{fprice}</span>
                  </li>
                </ul>
                <p>
                  Sub Total <span>₹{fprice}</span>
                </p>
                <p>
                  Tax <span>₹00.00</span>
                </p>
                <h4 className="mt--30">
                  Grand Total <span>₹{fprice}</span>
                </h4>
              </div>
            </div>
            {/* Payment Method */}
            <div className="col-12 mb--60">
              <h4 className="checkout-title">Payment Method</h4>
              <div className="checkout-payment-method">
                <div className="single-method">
                  <input
                    type="radio"
                    id="payment_check"
                    name="payment-method"
                    defaultValue="check"
                  />
                  <label htmlFor="payment_check">UPI</label>
                  <p data-method="check">
                  Pay with Paytm, Phonepe, Gpay or any other UPI app. <br/>Powered by Razorpay.
                  </p>
                </div>
                <div className="single-method">
                  <input
                    type="radio"
                    id="payment_check"
                    name="payment-method"
                    defaultValue="check"
                  />
                  <label htmlFor="payment_check">Card (Unavailable)</label>
                  <p data-method="check">
                  </p>
                </div>
                <div className="single-method">
                  <input type="checkbox" id="accept_terms" />
                  <label htmlFor="accept_terms">
                    I’ve read and accept the terms &amp; conditions
                  </label>
                </div>
              </div>
              <div className="plceholder-button mt--50">
                <button className="rbt-btn btn-gradient hover-icon-reverse" onClick={handleOrder}>
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Place order</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right" />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rbt-separator-mid">
    <div className="container">
      <hr className="rbt-separator m-0" />
    </div>
  </div>
</>
  );
}
