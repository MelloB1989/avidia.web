import { useState, useEffect } from 'react';
import axios from 'axios';
import get_jwt from '../../lib/frontend_functions/get_jwt';
import verify_session from '../../lib/verify_session';
import Layout from "@/components/lms_components/layout/common";
import get_user_data from '../../lib/get_user_data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, CardHeader, Heading, Stat, StatLabel, StatArrow, StatNumber, } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Select, SelectButton, SelectList, SelectOption } from '@saas-ui/react'
import { AreaChart } from '@saas-ui/charts';
import { LineChart } from '@saas-ui/charts';
import { Sparkline } from '@saas-ui/charts';
import { BarChart } from '@saas-ui/charts'

export default function AddContent() {
  
  const [userData, setUserData] = useState('');
  const [admin, setAdmin] = useState("0");
  const [cohort, setCohort] = useState('Cohort 2023');
  const [salesData, setSalesData] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [numberCoupons, setNumberCoupons] = useState([]);

  useEffect(() => {
    const jwt = get_jwt();
    if(jwt){
      verify_session(jwt)
      .then((result) => {
        if (result === 1) {
          // Session is valid, continue with your main code logic here
          //console.log("Session is valid!");
          get_user_data(jwt)
          .then((udata) => {
            if(udata !== null){
              setUserData(udata);
              setAdmin(udata.admin);
            }
          })
          .catch((error) => {
            console.log(error)
            window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          })
          
        } else {
          // Session is invalid, the user has been redirected to the login page
          console.log("Session is invalid. User redirected to login page.");
          window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during token verification or axios request
        console.error("Error while verifying session:", error);
        window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      });
    }
    else {
      // If the ACCESS_TOKEN cookie is not available, the user is not authenticated
      window.location.href = '/login';
    }
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const calculateTotalCouponSales = (data, coupon) => {
    let total = 0;
    data.forEach((sale) => {
      if (sale.description === coupon) {
        total += parseInt(sale.amt);
      }
    });
    return total;
  };

  const getCouponSales = (data, coupon) => {
    return data
    .filter(item => item.description === coupon)
    .map(item => ({
        date: item.date,
        value: parseInt(item.amt)
    }));
  };

  useEffect(()=>{
    const get_sales = async() => {
      const r = await axios.get(`https://ai-lisa.coffeecodes.in/v1/sales/getCohortSales/${cohort === "Cohort 2024 sigma" ? "cohort_2024_sigma" : cohort === "Cohort 2024 beta" ? "cohort_2024_beta" : cohort === "Cohort 2024 alpha" ? "cohort_2024_alpha" : "cohort_2023"}`, {
        headers:{
          "Authorization": "Bearer "+get_jwt()
        }
      })
      if(r.data.data) setSalesData(r.data.data)
      const descriptions = r.data.data.map(item => item.description);
      const uniqueDescriptions = [...new Set(descriptions)];
      setCoupons(uniqueDescriptions);
      const descriptionCounts = {};
      r.data.data.forEach(item => {
          const description = item.description;
          descriptionCounts[description] = (descriptionCounts[description] || 0) + 1;
      });
      const result = Object.entries(descriptionCounts).map(([coupon, count]) => ({ date: coupon, count }));
      setNumberCoupons(result);
      console.log(result)
    }
    get_sales();
  }, [cohort])

  return (
      <>
      { admin === "1" ? (
        <>
        <ToastContainer />
        <Layout title="Add quiz question | Avidia">
      {/* End Side Vav */}
      <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h2 className="title">Sales analysis</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="close_side_menu" href="javascript:void(0);" />
      <div className="rbt-elements-area bg-color-white rbt-section-gap">
        <div className="container">
          <div className="row gy-5 row--30">
            <div className="col-lg-6">
              <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <h3 className="title">Sales analysis</h3>
                <span className="rbt-badge-6 bg-secondary-opacity">
                  Cohort: {cohort}
                </span>
                <Select
                  name="cohort"
                  defaultValue={cohort}
                  options={[
                    { label: 'Cohort 2024 sigma', value: 'Cohort 2024 sigma' },
                    { label: 'Cohort 2024 beta', value: 'Cohort 2024 beta' },
                    { label: 'Cohort 2024 alpha', value: 'Cohort 2024 alpha' },
                    { label: 'Cohort 2023', value: 'Cohort 2023' },
                  ]}
                  onChange={(value) => setCohort(value)}
                >
                  <SelectButton />
                  <SelectList />
                </Select>
                <br/><br/>
                <Card>
                  <CardHeader pb="0">
                    <Heading as="h4" fontWeight="medium" size="md">
                      Revenue over time
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <LineChart
                      data={salesData}
                      categories={['amt']}
                      yAxisWidth={80}
                      height="300px"
                    />
                  </CardBody>
                </Card>
                <br/><br/>
                <div class="container">
                <span className="rbt-badge-6 bg-secondary-opacity">
                  Per Coupon Sales
                </span>
                <Card>
      <CardHeader pb="0">
        <Heading as="h4" fontWeight="medium" size="md">
          Revenue over time
        </Heading>
      </CardHeader>
      <CardBody>
        <BarChart
          data={numberCoupons}
          categories={['count']}
          yAxisWidth={80}
          height="300px"
        />
      </CardBody>
    </Card>
                  <div class="row">
                {
                  coupons.map((coupon)=>{
                    return(
                      <div class="col-sm-6 mx-2 my-3">
                      <Card width="300px">
                        <CardBody>
                          <Stat>
                            <StatLabel>{coupon}</StatLabel>
                            <StatNumber>
                            ₹ {calculateTotalCouponSales(salesData, coupon)}
                            </StatNumber>
                            <Sparkline
                              data={getCouponSales(salesData, coupon)}
                              height="60px"
                              colors={['orange']}
                              mx="-4"
                            />
                          </Stat>
                        </CardBody>
                      </Card>
                      </div>
                    )
                  })
                }
                </div>
                </div>
                <br/><br/>
                <Card>
                <CardHeader pb="0">
                    <Heading as="h4" fontWeight="medium" size="md">
                    Sales per coupon
                    </Heading>
                </CardHeader>
                <CardBody>
                    <AreaChart
                    data={salesData}
                    categories={['description', 'amt']}
                    colors={['primary', 'secondary']}
                    height="300px"
                    />
                </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
    ) : (<p>You do not have access to this page!</p>)
      }
    </>
  );
}
