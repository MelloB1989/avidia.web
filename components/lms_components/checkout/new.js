import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import get_mycourses from '@/lib/frontend_functions/lms/get_course_details';
import get_jwt from '../../../lib/frontend_functions/get_jwt';
import decode_jwt from "@/lib/frontend_functions/decode_jwt";

export default function Checkout({ change_success, course_id }){

    const [coupon, setCoupon] = useState('MELLOBS');
    const [courseD, setCourseD] = useState({});
    const [fprice, setFPrice] = useState('');
    const [coupon_applied, setCApply] = useState('0');
    const [status, setStatus] = useState('0');
    const [payURL, setPayURL] = useState('no');
    const { loading, error, data } = useQuery(querygen("getCohortById", course_id ? course_id : ""));

    useEffect(()=>{
      if(!loading && data){ 
        setCourseD(data.queryCohortsByIdPermalinkIndex.items[0]);
        setFPrice(data.queryCohortsByIdPermalinkIndex.items[0].priceInr);
      }
    }, [loading, data]);

    const check_status = async (id) => {
      const courses = await get_mycourses((decode_jwt(get_jwt())).userId);
      if(courses){
        if(courses.length > 0){
          const course = courses.filter((c) => c.id === course_id);
          if(course.length > 0){
            change_success(true);
            toast.success("You have successfully enrolled in the course!");
            setStatus('1');
            toast.dismiss(id);
          }
        }
      }
    }

    const handleOrder = async () => {
      const id = toast.loading("Contacting KarmaPay...");
        const jwt = get_jwt();
        if(jwt){
            const res = await axios.post('/api/cohorts/get_payment_url', { code: coupon, course: courseD.permalink, token: jwt });
            if(res.data.kpr){
                const kpr = res.data.kpr;
                setTimeout(() => {
                  setPayURL(`https://payments.avidia.in/payments/${kpr.oid}`);
                  window.open(`https://payments.avidia.in/payments/${kpr.oid}`);
                }, 4000);
                setInterval(() => {
                  if(status === '0') check_status(id);
                }, 5000);
            } else {
                toast.error("Payment failed! Please try again!");
                toast.dismiss(id);
            }
        } else {
            toast.error("Please login to place order!");
            toast.dismiss(id);
        }
    }

    const apply_coupon = async () => {
      const id = toast.loading("Checking coupon...");
        const jwt = get_jwt();
        if(jwt){
            const res = await axios.post('/api/cohorts/get_coupons', { code: coupon, token: jwt });
            if(res.data.message === 'success'){
                const couponData = res.data.data;
                if(couponData.applies === courseD.permalink){
                    setFPrice(fprice - couponData.discount);
                    setCApply('1');
                    toast.success("Coupon applied successfully!");
                    toast.dismiss(id);
                } else {
                  toast.error("Invalid coupon code !!");
                  toast.dismiss(id);
                }
            } else {
                toast.error("Invalid coupon code!");
                toast.dismiss(id);
            }
        } else {
            toast.error("Please login to apply coupon!");
            toast.dismiss(id);
        }
    }

    return(
        <>
        <Toaster/>
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
              <h4 className="checkout-title">Register for cohort</h4>
              <div className="row">
                <div className="col-md-6 col-12 mb--20">
                  <label>Coupon (if any)</label>
                  <input type="text" placeholder="Coupon code" onChange={(event) => {setCoupon(event.target.value)}}/>
                   <a class="rbt-btn-link" href="#" onClick={(e)=>{
                     e.preventDefault;
                     coupon_applied === '0' ? apply_coupon() : toast.error("Coupon is already applied!");
                   }}>Apply Coupon<i class="feather-arrow-right"></i></a>
                </div>
              </div>
            </div>
            {/* Shipping Address */}
            <div id="shipping-form" className="mt--20">
              <h4 className="checkout-title">Your details</h4>
              <div className="row g-5">
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
            {
                  payURL !== 'no' ? (
                    <>
                    <div className="col-md-6 col-12">
                      <button className="rbt-btn btn-gradient w-100" onClick={()=>{window.open(payURL)}}>
                      Click to pay
                    </button>
                    </div>
                    </>
                  ) : (<></>)
                }
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
                    {courseD?.name+" "} <span>₹{fprice}</span>
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
    )
}