import Layout from '@/components/lms_components/layout/protected';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import {UserContext} from '@/components/lms_components/layout/UserContext';

export default function Enroll() {
    const { userData } = useContext(UserContext);
    const [status, setStatus] = useState("not_enrolled");
    useEffect(()=>{
        const e = async()=>{
            if(userData == null) return;
            const res = await axios.post('/api/enroll', {
                email: userData?.email,
                courseId: "python_phase_1",
                token: get_jwt()
            });
            console.log(res);
            setStatus("enrolled");
        }
        e();
    },[userData]);
    return(
        <Layout title="Enroll to Python Phase 1">
            <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-conatct-area bg-gradient-11 rbt-section-gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title text-center mb--60">
            <span className="subtitle bg-secondary-opacity">Direct Enroll</span>
            <h2 className="title">
              Avidia Direct Enroll <br /> 
            </h2>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
          data-sal="slide-up"
          data-sal-delay={150}
          data-sal-duration={800}
        >
          <div className="rbt-address">
            <div className="icon">
              <i className="feather-headphones" />
            </div>
            <div className="inner">
              <h4 className="title">{status === "enrolled" ? "You have been enrolled": "Enrolling..."}</h4>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
          data-sal="slide-up"
          data-sal-delay={250}
          data-sal-duration={800}
        >
        </div>
      </div>
    </div>
  </div>
        </Layout>
    )
}