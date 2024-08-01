import axios from 'axios';
import {UserContext} from '@/components/lms_components/layout/UserContext';
import Skeleton from 'react-loading-skeleton';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import {useEffect, useState, useContext} from 'react';
import Layout from '@/components/lms_components/layout/protected';

export default function ActiveLabs(){
    
    const { userData } = useContext(UserContext);
    const [flasks, setFlasks] = useState([]);
    
    useEffect(()=>{
        const req = async() => {
       const r = await axios.post('/api/labs/get_my_flasks', {
           userid: userData?.username,
           token: get_jwt()
       }, {
           headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
       });
       setFlasks(r.data);
    }
    req();
    }, [userData]);
    return(
        <Layout title="My Flasks | Avidia">
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-page-banner-wrapper">
    {/* Start Banner BG Image  */}
    <div className="rbt-banner-image" />
    {/* End Banner BG Image  */}
    <div className="rbt-banner-content">
      {/* Start Banner Content Top  */}
      <div className="rbt-banner-content-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Start Breadcrumb Area  */}
              <ul className="page-list">
                <li className="rbt-breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <div className="icon-right">
                    <i className="feather-chevron-right" />
                  </div>
                </li>
                <li className="rbt-breadcrumb-item active">My Flask</li>
              </ul>
              {/* End Breadcrumb Area  */}
              <div className=" title-wrapper">
                <h1 className="title mb--0">My Flasks</h1>
                <a href="#" className="rbt-badge-2">
                  <div className="image">🧪</div> {flasks?.data?.count} &nbsp; Active Flasks
                </a>
              </div>
              <p className="description">
                Any Software, Anytime, Anywhere!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner Content Top  */}
    </div>
  </div>
  <div className="rbt-counterup-area rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      <div className="row g-5">
        {flasks?.data ? flasks.data?.workspaces?.map((flask)=>{
            return (
            <div className="col-lg-6 col-md-6 col-12" key={flask.id}>
          <div className="rbt-card card-list-2 event-list-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <a href={`/labs/dashboard/view/${flask.id}`}>
                <img
                  src={flask.template_icon}
                  alt={flask.template_name}
                />
              </a>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <a href={`/labs/dashboard/view/${flask.id}`}>
                  {flask.template_display_name}
                </a>
              </h4>
              <div className="read-more-btn">
                <a
                  className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                  href={`/labs/dashboard/view/${flask.id}`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">View details</span>
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
          </div>
        </div>
            )
        }):(
        <>
            <div className="col-lg-6 col-md-6 col-12">
          <div className="rbt-card card-list-2 event-list-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Skeleton height={150}/>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <Skeleton count={5}/>
              </h4>
              <div className="read-more-btn">
                <a
                  className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                  href={`/labs/dashboard/view/`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text"><Skeleton/></span>
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
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="rbt-card card-list-2 event-list-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Skeleton height={150}/>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <Skeleton count={5}/>
              </h4>
              <div className="read-more-btn">
                <a
                  className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                  href={`/labs/dashboard/view/`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text"><Skeleton/></span>
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
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="rbt-card card-list-2 event-list-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Skeleton height={150}/>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <Skeleton count={5}/>
              </h4>
              <div className="read-more-btn">
                <a
                  className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                  href={`/labs/dashboard/view/`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text"><Skeleton/></span>
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
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="rbt-card card-list-2 event-list-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Skeleton height={150}/>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <Skeleton count={5}/>
              </h4>
              <div className="read-more-btn">
                <a
                  className="rbt-btn btn-border hover-icon-reverse btn-sm radius-round"
                  href={`/labs/dashboard/view/`}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text"><Skeleton/></span>
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
          </div>
        </div>
        </>
            )}
      </div>
      <div className="row">
        <div className="col-lg-12 mt--60">
          <nav>
            <ul className="rbt-pagination">
              <li>
                <a href="#" aria-label="Previous">
                  <i className="feather-chevron-left" />
                </a>
              </li>
              <li className="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#" aria-label="Next">
                  <i className="feather-chevron-right" />
                </a>
              </li>
            </ul>
          </nav>
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