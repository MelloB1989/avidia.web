import Layout from '@/components/lms_components/layout/common';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import {useEffect, useState} from 'react';

export default function Workspaces(){
    
    const [flasks, setFlasks] = useState([])
    
    useEffect(()=>{
       const get_workspaces = async()=>{
           const r = await axios.get('/api/labs/get_workspaces');
           setFlasks(r.data.data);
           //console.log(flasks);
       } 
       get_workspaces();
    },[]);
    
    return(
        <Layout title="Workspaces | Avidia Labs">
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
                <li className="rbt-breadcrumb-item active">All Flasks</li>
              </ul>
              {/* End Breadcrumb Area  */}
              <div className=" title-wrapper">
                <h1 className="title mb--0">Available Flasks</h1>
                <a href="#" className="rbt-badge-2">
                  <div className="image">🎉</div> BETA LIVE
                </a>
              </div>
              <p className="description">
                Revolutionizing Your Digital Experience: Run Any Software Directly in Your Browser!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner Content Top  */}
      {/* Start Course Top  */}
      <div className="rbt-course-top-wrapper mt--40">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="rbt-sorting-list d-flex flex-wrap align-items-center">
                <div className="rbt-short-item">
                  <span className="course-index">
                    Showing 1-9 of 19 results
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="rbt-sorting-list d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end">
                <div className="rbt-short-item">
                  <form action="#" className="rbt-search-style me-0">
                    <input type="text" placeholder="Search Your Course.." />
                    <button
                      type="submit"
                      className="rbt-search-btn rbt-round-btn"
                    >
                      <i className="feather-search" />
                    </button>
                  </form>
                </div>
                <div className="rbt-short-item">
                  <div className="view-more-btn text-start text-sm-end">
                    <button className="discover-filter-button discover-filter-activation rbt-btn btn-white btn-md radius-round">
                      Filter
                      <i className="feather-filter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Start Filter Toggle  */}
          <div className="default-exp-wrapper default-exp-expand">
            <div className="filter-inner">
              <div className="filter-select-option">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Short By</span>
                  <select>
                    <option>Default</option>
                    <option>Latest</option>
                    <option>Popularity</option>
                    <option>Trending</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                  </select>
                </div>
              </div>
              <div className="filter-select-option">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Short By Author</span>
                  <select
                    data-live-search="true"
                    title="Select Author"
                    multiple=""
                    data-size={7}
                    data-actions-box="true"
                    data-selected-text-format="count > 2"
                  >
                    <option data-subtext="Experts">Janin Afsana</option>
                    <option data-subtext="Experts">Joe Biden</option>
                    <option data-subtext="Experts">Fatima Asrafy</option>
                    <option data-subtext="Experts">Aysha Baby</option>
                    <option data-subtext="Experts">Mohamad Ali</option>
                    <option data-subtext="Experts">Jone Li</option>
                    <option data-subtext="Experts">Alberd Roce</option>
                    <option data-subtext="Experts">Zeliski Noor</option>
                  </select>
                </div>
              </div>
              <div className="filter-select-option">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Short By Offer</span>
                  <select>
                    <option>Free</option>
                    <option>Paid</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
              <div className="filter-select-option">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">
                    Short By Category
                  </span>
                  <select data-live-search="true">
                    <option>Web Design</option>
                    <option>Graphic</option>
                    <option>App Development</option>
                    <option>Figma Design</option>
                  </select>
                </div>
              </div>
              <div className="filter-select-option">
                <div className="filter-select">
                  <span className="select-label d-block">Price Range</span>
                  <div className="price_filter s-filter clear">
                    <form action="#" method="GET">
                      <div id="slider-range" />
                      <div className="slider__range--output">
                        <div className="price__output--wrap">
                          <div className="price--output">
                            <span>Price :</span>
                            <input type="text" id="amount" />
                          </div>
                          <div className="price--filter">
                            <a className="rbt-btn btn-gradient btn-sm" href="#">
                              Filter
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Filter Toggle  */}
        </div>
      </div>
      {/* End Course Top  */}
    </div>
  </div>
  {/* Start Card Style */}
  <div className="rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      {/* Start Card Area */}
      <div className="row g-5">
      {flasks ? flasks?.map((flask)=>{
          return (<div
          className="col-lg-4 col-md-6 col-sm-6 col-12"
          data-sal-delay={150}
          data-sal="slide-up"
          data-sal-duration={800}
          key={flask.name}
        >
          <div className="rbt-card variation-03 rbt-hover">
            <div className="rbt-card-img">
              <a className="thumbnail-link" href={`/labs/dashboard/launch/${flask.name}`}>
                <img
                  src={flask.icon}
                  alt={flask.display_name}
                />
                <span className="rbt-btn btn-white icon-hover">
                  <span className="btn-text">Launch</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </span>
              </a>
            </div>
            <div className="rbt-card-body">
              <h5 className="rbt-card-title">
                <a href={`/labs/dashboard/launch/${flask.name}`}>
                  {flask.display_name}
                </a>
              </h5>
              <div className="rbt-card-bottom">
                <a className="transparent-button" href={`/labs/dashboard/launch/${flask.name}`}>
                  <i>
                    <svg
                      width={17}
                      height={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="#27374D" fill="none" fillRule="evenodd">
                        <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                        <path strokeLinecap="square" d="M.663 5.572h14.594" />
                      </g>
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>)
      }) : (
      <div
          className="col-lg-4 col-md-6 col-sm-6 col-12"
          data-sal-delay={150}
          data-sal="slide-up"
          data-sal-duration={800}
        >
          <div className="rbt-card variation-03 rbt-hover">
            <div className="rbt-card-img">
              <a className="thumbnail-link" href="#">
                <Skeleton height={150} />
                <span className="rbt-btn btn-white icon-hover">
                  <span className="btn-text">Launch</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </span>
              </a>
            </div>
            <div className="rbt-card-body">
              <h5 className="rbt-card-title">
                <a href="course-details.html">
                 <Skeleton />
                </a>
              </h5>
              <div className="rbt-card-bottom">
                <a className="transparent-button" href="course-details.html">
                  <i>
                    <svg
                      width={17}
                      height={12}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="#27374D" fill="none" fillRule="evenodd">
                        <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                        <path strokeLinecap="square" d="M.663 5.572h14.594" />
                      </g>
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      {/* End Card Area */}
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
  {/* End Card Style */}
</Layout>
        )
}