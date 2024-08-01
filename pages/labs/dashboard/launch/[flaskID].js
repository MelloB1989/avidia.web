import {UserContext} from '@/components/lms_components/layout/UserContext';
import Layout from '@/components/lms_components/layout/protected';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import {useEffect, useState, useContext} from 'react';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import { v4 as uuidv4 } from 'uuid';
import {toast} from 'react-toastify';
const RAZORPAY_KEY = "rzp_live_GXqopiJc6sryXL";
//const RAZORPAY_KEY = "rzp_test_lqzrYWr5WUy06I";
import querygen from '@querygen';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function LaunchPad(){
    
    const { userData, setUserData } = useContext(UserContext);
    const [flaskdetails, setFlaskDetails] = useState([]);
    const router = useRouter();
    const { flaskID } = router.query;
    const [buyavc, setBuyAVC] = useState(1);
    const [avc, setAVC] = useState(0);
    const [pricing, setPricing] = useState();
    const [fgn, setFGN] = useState("");
    const [hours, setHours] = useState(0);
    const [plan, setPlan] = useState("basic");
    const [total, setTotal] = useState();
    
     const handlePlanChange = (event) => {
      setPlan(event.target.value);
      //console.log(plan);
    };
    
    function toCamelCase(str) {
    return str
        // Split the string into words
        .split(' ')
        // Map each word to a new word where the first letter is capitalized (except the first word)
        .map((word, index) => 
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        // Join the words back into a single string
        .join('');
}

//############################################PAYMENT HANDLING############################################    
    const handleBuyAVC = (e) => {
      e.preventDefault();
      if(buyavc <= 0 || buyavc === undefined || buyavc < 200) toast.error('Minimum 200 AVC can be added!')
      else {
        toast.success('Minting AVC...');
        createOrder();
      }
    }
    
    const verify_payment = async (order, payment_id, signature) => {
    const j = get_jwt();
    const formData = new URLSearchParams();
    formData.append('order_id', order);
    formData.append('payment_id', payment_id);
    formData.append('signature', signature);
    formData.append('description', `Order for ${buyavc} AVC coins`);
    formData.append('avc_amt', buyavc);
    formData.append('amt', (buyavc*parseFloat(pricing?.avc_inr, 10)));
    formData.append('mail', userData.email);
    formData.append('token', j);
    formData.append('name', userData.first_name);
    const response = await axios.post('/api/payments/verify_payment_labs', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
      
      if (response.status === 200 && response.data.validity) {
        // Redirect to the dashboard page upon successful authentication
        toast.success('Payment successful!!');
        setAVC(parseFloat(avc)+parseFloat(buyavc))
      } else {
        toast.error('Something wrong with your payment 🥲 Please contact us if money was deducted.');
      }
  }
  
  const createOrder = async () => {
    const formData = new URLSearchParams();
    const r = get_jwt();
    formData.append('token', r);
    //formData.append('amt', course_price);
    formData.append('amt', (buyavc*parseFloat(pricing?.avc_inr, 10)));
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
        //setOrder(od);
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
      amount: (buyavc*parseFloat(pricing?.avc_inr, 10))+"00",
      order_id: order,
      name: "Buy AVC",
      description: "Avidia Labs",
      image: "https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/cover-removebg-preview.png",
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
        name: userData.first_name,
        email: userData.email,
        phone_number: userData.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    }
  }
//##############################################PAYMENT HANDLING#########################################

    const { loading, error, data } = useQuery(querygen("getUserCoderD", userData?.user_id));
    useEffect(()=>{
    //   const currentHost = window.location.host;
    //   if (currentHost !== 'avidia-payments.edodwaja.com') {
    //   window.location.href = `https://avidia-payments.edodwaja.com/login?message=Please+login+to+launch+flasks&nextUrl=https://avidia-payments.edodwaja.com/labs/dashboard/launch/${flaskID}`;
    // }
    if(error) toast.error('Error!');
    if(data){
         //console.log('Data:',data);
         if(data.getUser?.coderlabUID === null/* && data.getUser?.AVC_balance === null*/){
           toast.success("You got 20 AVC free as a part of BETA program");
           setAVC(20);
         } 
         else if(data.getUser?.coderlabUID === null && data.getUser?.AVC_balance !== null){
           setAVC(data.getUser?.AVC_balance);
         }
         else{
           setAVC(data.getUser?.AVC_balance);
         }
       }
    },[data, userData]);
    
    useEffect(()=>{
       const get_workspaces = async()=>{
           const r = await axios.post('/api/labs/get_flask_details', {id: flaskID}, {
                headers: {
                  'Content-Type': 'application/json', // Set the appropriate content type for form data
                },
              });
           setFlaskDetails(r.data.data);
           setPricing((await axios.get('/api/labs/get_pricing')).data)
       } 
       get_workspaces();
    },[]);
    
    const handleLaunch = async()=>{
      const id = toast.loading("Launching...");
      try{
        const r = await axios.post('/api/labs/request_flask', {
          token: get_jwt(),
          email: userData.email,
          flask_template_id: flaskdetails.active_version_id,
          flask_given_name: fgn,
          plan: plan,
          hours: hours,
          username: userData.username,
          nbspid: userData.user_id
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if(r.data){
          toast.update(id, { render: "Flask has been launched!!", type: "success", isLoading: false });
          router.push(`/labs/dashboard/view/${r.data.data}`)
        }
        else toast.error('We are sorry, somthing unexpected occured.')
      } catch(e) {
        toast.error('Please fill all fields');
        toast.error(e);
      }
  }
    
    return(
        <Layout title="Flask Launchpad" avc={avc}>
  <a className="close_side_menu" href="javascript:void(0);" />
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-inner text-center">
            <h2 className="title">Launch {flaskdetails?.display_name}</h2>
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right" />
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Launchpad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumb Area */}
  <div className="rbt-cart-area bg-color-white rbt-section-gap">
    <div className="cart_area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row g-5">
              <div className="col-lg-6 col-12">
                {/* Calculate Shipping */}
                <div className="calculate-shipping edu-bg-shade">
                  <div className="section-title text-start">
                    <h4 className="title mb--30">Configure Flask</h4>
                  </div>
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6 col-12 mb--20">
                        <input type="number" placeholder="Number of hours" onChange={(e)=>{if(e.target.value<0) toast.error("Negative value not allowed"); setHours(e.target.value)}}/>
                      </div>
                      <div className="col-md-6 col-12 mb--25">
                        <div className="rbt-modern-select bg-transparent height-45">
                          <select className="w-100" value={plan} onChange={handlePlanChange}>
                            <option value="begineer">Begineer (1GB RAM)</option>
                            <option value="basic">Basic (2GB RAM)</option>
                            <option value="nerd">Nerd (4GB RAM)</option>
                            <option value="pro">Pro (8GB RAM)</option>
                            <option value="ultra">Ultra (16 GB)</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 mb--25">
                        <input type="text" placeholder="Give a name to your flask" onChange={(e)=>{
                          setFGN(toCamelCase(e.target.value));
                        }}/>
                      </div>
                      <div className="col-md-6 col-12 mb--25">
                        <a
                          className="rbt-btn btn-gradient hover-icon-reverse btn-sm"
                          href="#"
                          onClick={(e)=>{
                            e.preventDefault();
                            setTotal(hours * pricing[plan])
                          }}
                        >
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">Estimate Cost</span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right" />
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right" />
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Discount Coupon */}
                <div className="discount-coupon edu-bg-shade">
                  <div className="section-title text-start">
                    <h4 className="title">Avidian Credits (AVC) <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="50px"/></h4>
                    <br/>
                  </div>
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6 col-12 mb--25">
                        <input type="number" value={buyavc} onChange={(e)=>{
                          setBuyAVC(e.target.value);
                        }}/>
                      </div>
                      <div className="col-md-6 col-12 mb--25">
                        <button className="rbt-btn btn-gradient hover-icon-reverse btn-sm" onClick={handleBuyAVC}>
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">Add <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="30px"/></span>
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
                  </form>
                   <p >{buyavc} <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="30px"/> = ₹{(buyavc*parseFloat(pricing?.avc_inr))}</p>
                </div>
              </div>
              {/* Cart Summary */}
              <div className="col-lg-5 offset-lg-1 col-12">
                <div className="cart-summary">
                  <div className="cart-summary-wrap">
                    <div className="section-title text-start">
                      <h4 className="title mb--30">Flask Cost Summary</h4>
                    </div>
                    <p>
                      Current AVC Balance <span>{avc} <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="30px"/></span>
                    </p>
                    <p>
                      Estimated AVC <span>- {total} <img src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/avc-icon-cropped.png" height="50px" width="30px"/></span>
                    </p>
                    <p>
                      GST <span>- %18</span>
                    </p>
                    <h2>
                      Grand Total <span>{(18/100)*total+total}</span>
                    </h2>
                  </div>
                  <div className="cart-submit-btn-group">
                    <div className="single-button w-50">
                      <button className="rbt-btn btn-gradient rbt-switch-btn rbt-switch-y w-100" onClick={handleLaunch}>
                        <span data-text=" 🚀">Launch Flask</span>
                      </button>
                    </div>
                  </div>
                </div>
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
        </Layout>
        )
}