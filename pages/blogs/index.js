import Layout from '@/components/lms_components/layout/common';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function BlogHome(){
    const [blogs, setBlogs] = useState([]);

    const get_blogs = async () => {
        const r = await axios.get('https://blogs-cc.coffeecodes.in/v1/blogs/getAll/MelloB');
        setBlogs(r.data);
    }

    useEffect(() => {
        get_blogs();
    }, []);

    return(
        <Layout title="Avidia Blogs">
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
                <li className="rbt-breadcrumb-item active">Latest Blogs</li>
              </ul>
              {/* End Breadcrumb Area  */}
              <div className="title-wrapper">
                <h1 className="title mb--0">All Blogs</h1>
                <a href="#" className="rbt-badge-2">
                  <div className="image">🎉</div> 50 Blogs
                </a>
              </div>
              <p className="description">
                NBL Blogs{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner Content Top  */}
    </div>
  </div>
  <div className="rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      <div className="row row--30 gy-5">
        <div className="col-lg-8">
          {/* Start Card Area */}
          <div className="row g-5">
            {blogs.map((blog, index) => {
                return (
                    <div className="col-lg-6 col-md-6 col-12" key={index}>
              <div className="rbt-blog-grid rbt-card variation-02 rbt-hover">
                <div className="rbt-card-img">
                  <a href="blog-details.html">
                    <img
                      src={blog.thumbnail}
                      alt="Card image"
                    />{" "}
                  </a>
                </div>
                <div className="rbt-card-body">
                <h5 className="rbt-card-title">
                    <a href={`/blogs/read/${blog.id}`} dangerouslySetInnerHTML={{ __html: blog.title }}>
                    </a>
                </h5>
                  <ul className="blog-meta">
                    <li>
                      <i className="feather-user" /> Noobs Team
                    </li>
                    {/*<li>
                      <i className="feather-clock" /> August 3, 2023
                    </li>*/}
                    <li>
                      <i className="feather-watch" /> {blog.posted} ago
                    </li>
                  </ul>
                  <p className="rbt-card-text">
                    {blog.description}
                  </p>
                  <div className="rbt-card-bottom">
                    <a className="transparent-button" href={`/blogs/read/${blog.id}`}>
                      Read
                      <i>
                        <svg
                          width={17}
                          height={12}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g stroke="#27374D" fill="none" fillRule="evenodd">
                            <path d="M10.614 0l5.629 5.629-5.63 5.629" />
                            <path
                              strokeLinecap="square"
                              d="M.663 5.572h14.594"
                            />
                          </g>
                        </svg>
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
                )
            })}
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
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li className="active">
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
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
        <div className="col-lg-4">
          <aside className="rbt-sidebar-widget-wrapper rbt-gradient-border">
            {/* Start Widget Area  */}
            <div className="rbt-single-widget rbt-widget-search">
              <div className="inner">
                <form action="#" className="rbt-search-style-1">
                  <input type="text" placeholder="Search Blogs" />
                  <button className="search-btn">
                    <i className="feather-search" />
                  </button>
                </form>
              </div>
            </div>
            {/* End Widget Area  */}
            {/* Start Widget Area  */}
            <div className="rbt-single-widget rbt-widget-recent">
              <div className="inner">
                <h4 className="rbt-widget-title">Recent Post</h4>
                <ul className="rbt-sidebar-list-wrapper recent-post-list">
                  <li>
                    <div className="thumbnail">
                      <a href="#">
                        <img
                          src={"https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"}
                          alt="Event Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <h6 className="title">
                        <a href="#">
                        React Labs: What We've Been Working On – February 2024
                        </a>
                      </h6>
                      <ul className="rbt-meta">
                        <li>
                          <i className="feather-clock" />
                          26 Mar, 2024
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* End Widget Area  */}
            {/* Start Widget Area  */}
            <div className="rbt-single-widget rbt-widget-recent">
              <div className="inner">
                <h4 className="rbt-widget-title">Popular Post</h4>
                <ul className="rbt-sidebar-list-wrapper recent-post-list">
                  <li>
                    <div className="thumbnail">
                      <a href="#">
                        <img
                          src="https://images.ctfassets.net/23aumh6u8s0i/c04wENP3FnbevwdWzrePs/1e2739fa6d0aa5192cf89599e009da4e/nextjs"
                          alt="Event Images"
                        />
                      </a>
                    </div>
                    <div className="content">
                      <h6 className="title">
                        <a href="event-details.html">
                          Basics of Next.js
                        </a>
                      </h6>
                      <ul className="rbt-meta">
                        <li>
                          <i className="feather-clock" />
                          26 Mar, 2024
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* End Widget Area  */}
            {/* Start Widget Area  */}
            <div className="rbt-single-widget rbt-widget-tag">
              <div className="inner">
                <h4 className="rbt-widget-title">Tags</h4>
                <div className="rbt-sidebar-list-wrapper rbt-tag-list">
                  <a href="#">Cohort</a>
                </div>
              </div>
            </div>
            {/* End Widget Area  */}
          </aside>
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