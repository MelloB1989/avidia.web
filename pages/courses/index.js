import Layout from '../../components/lms_components/layout/common';
export default function Courses(){
    return(
        <>
        <Layout title="Courses || Avidia">
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
                <li className="rbt-breadcrumb-item active">All Courses</li>
              </ul>
              {/* End Breadcrumb Area  */}
              <div className=" title-wrapper">
                <h1 className="title mb--0">All Courses</h1>
                <a href="#" className="rbt-badge-2">
                  <div className="image">🎉</div> 50 Courses
                </a>
              </div>
              <p className="description">
                Courses that help beginner designers become true unicorns.{" "}
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
          <div className="row mt--60">
            <div className="col-lg-12">
              <div className="rbt-portfolio-filter filter-button-default messonry-button text-start justify-content-start">
                <button data-filter="*" className="is-checked">
                  <span className="filter-text">All Course</span>
                  <span className="course-number">06</span>
                </button>
                <button data-filter=".cat--1" className="">
                  <span className="filter-text">Featured</span>
                  <span className="course-number">02</span>
                </button>
                <button data-filter=".cat--2">
                  <span className="filter-text">Popular</span>
                  <span className="course-number">05</span>
                </button>
                <button data-filter=".cat--3">
                  <span className="filter-text">Trending</span>
                  <span className="course-number">03</span>
                </button>
                <button data-filter=".cat--4">
                  <span className="filter-text">Latest</span>
                  <span className="course-number">04</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Course Top  */}
    </div>
  </div>
  <div className="rbt-section-overlayping-top rbt-section-gapBottom masonary-wrapper-activation">
    <div className="container">
      {/* Start Card Area */}
      <div className="row row--15">
        <div className="col-lg-12">
          <div className="mesonry-list grid-metro2">
            <div className="resizer" />
            {/* Start Single Card  */}
            <div className="maso-item cat--1">
              <div className="rbt-card variation-01 rbt-hover card-list-2">
                <div className="rbt-card-img">
                  <a href="/courses/cohort_2024">
                    <img
                      src="https://img.freepik.com/free-vector/segmentation-concept-illustration_114360-7359.jpg?w=740&t=st=1694943374~exp=1694943974~hmac=53e79be6ec3eacffc48655b114642c4347aef3b9368353650b4b35e3f7e1c078"
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <div className="rbt-card-top">
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (15 Reviews)</span>
                    </div>
                    <div className="rbt-bookmark-btn">
                      <a className="rbt-round-btn" title="Bookmark" href="#">
                        <i className="feather-bookmark" />
                      </a>
                    </div>
                  </div>
                  <h4 className="rbt-card-title">
                    <a href="/courses/cohort_2024">Cohort 2024</a>
                  </h4>
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book" />
                      8 Episodes
                    </li>
                    <li>
                      <i className="feather-book" />
                      24 lessons
                    </li>
                  </ul>
                  <p className="rbt-card-text">
                    Register now
                  </p>
                  
                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">₹1399</span>
                      <span className="off-price"></span>
                    </div>
                    <a className="rbt-btn-link" href="/courses/cohort_2024">
                      Learn More
                      <i className="feather-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Card  */}
            {/* Start Single Card  */}
            <div className="maso-item cat--2">
              <div className="rbt-card variation-01 rbt-hover card-list-2">
                <div className="rbt-card-img">
                  <a href="#">
                    <img
                      src="https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2EP14mWkbx9sq03nWnRSGT/f1d22d88bb5dde030275f9520c0f2e92/React_YT_Thumbnail.png"
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <div className="rbt-card-top">
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (15 Reviews)</span>
                    </div>
                    <div className="rbt-bookmark-btn">
                      <a className="rbt-round-btn" title="Bookmark" href="#">
                        <i className="feather-bookmark" />
                      </a>
                    </div>
                  </div>
                  <h4 className="rbt-card-title">
                    <a href="#">React Beginner to Advanced</a>
                  </h4>
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book" />
                      12 Lessons
                    </li>
                    <li>
                      <i className="feather-users" />
                      50 Students
                    </li>
                  </ul>
                  <p className="rbt-card-text">
                    Coming soon
                  </p>
                  
                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">Coming soon</span>
                      <span className="off-price"></span>
                    </div>
                    <a
                      className="rbt-btn-link left-icon"
                      href="#"
                    >
                      <i className="feather-shopping-cart" /> Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Card  */}
            {/* Start Single Card  */}
            <div className="maso-item cat--1 cat--3">
              <div className="rbt-card variation-01 rbt-hover card-list-2">
                <div className="rbt-card-img">
                  <a href="#">
                    <img
                      src="https://appmaster.io/api/_files/GzqWd4PwSvYSt57Y4u7sfU/download/"
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <div className="rbt-card-top">
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (15 Reviews)</span>
                    </div>
                    <div className="rbt-bookmark-btn">
                      <a className="rbt-round-btn" title="Bookmark" href="#">
                        <i className="feather-bookmark" />
                      </a>
                    </div>
                  </div>
                  <h4 className="rbt-card-title">
                    <a href="#">SQL Beginner Advanced</a>
                  </h4>
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book" />
                      12 Lessons
                    </li>
                    <li>
                      <i className="feather-users" />
                      50 Students
                    </li>
                  </ul>
                  <p className="rbt-card-text">
                   Coming soon.
                  </p>
                  
                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">Coming soon</span>
                      <span className="off-price"></span>
                    </div>
                    <a
                      className="rbt-btn-link left-icon"
                      href="#"
                    >
                      <i className="feather-shopping-cart" /> Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Card  */}
            {/* Start Single Card  */}
            <div className="maso-item cat--2 cat--4">
              <div className="rbt-card variation-01 rbt-hover card-list-2">
                <div className="rbt-card-img">
                  <a href="#">
                    <img
                      src="https://oracle-devrel.github.io/devo-image-repository/seo-thumbnails/JavaScript---Thumbnail-1200-x-630.jpg"
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <div className="rbt-card-top">
                    <div className="rbt-review">
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <span className="rating-count"> (5 Reviews)</span>
                    </div>
                    <div className="rbt-bookmark-btn">
                      <a className="rbt-round-btn" title="Bookmark" href="#">
                        <i className="feather-bookmark" />
                      </a>
                    </div>
                  </div>
                  <h4 className="rbt-card-title">
                    <a href="#">JS Zero to Mastery</a>
                  </h4>
                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book" />8 Lessons
                    </li>
                    <li>
                      <i className="feather-users" />
                      30 Students
                    </li>
                  </ul>
                  <p className="rbt-card-text">
                   Coming soon.
                  </p>
                  
                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">$80</span>
                      <span className="off-price">$100</span>
                    </div>
                    <a className="rbt-btn-link" href="#">
                      Learn More
                      <i className="feather-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Card  */}
          </div>
          {/* End Card Area */}
        </div>
      </div>
    </div>
  </div>
        </Layout>
        </>
        );
}