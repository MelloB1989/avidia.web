import Layout from '@/components/lms_components/layout/common';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

export default function BlogPage(){

    const [blog, setBlog] = useState({});
    const router = useRouter();
    const { blogId } = router.query;

    const get_blogs = async () => {
        const r = await axios.get(`https://blogs-cc.coffeecodes.in/v1/blogs/getSingle/${blogId}`);
        setBlog(r.data.data);
    }

    useEffect(() => {
        get_blogs();
    }, [blogId]);

    return(
        <Layout title={blog?.title}>
            <Head>
      <title>{blog?.title}</title>
      <meta name="description" content={blog?.description} />
      <meta property="og:title" content={blog?.title} />
      <meta property="og:description" content={blog?.description} />
      <meta property="og:image" content={blog?.thumbnail} />
    </Head>
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-overlay-page-wrapper">
    <div className="breadcrumb-image-container breadcrumb-style-max-width">
      <div className="breadcrumb-image-wrapper">
        <img src="assets/images/bg/bg-image-10.jpg" alt="Education Images" />
      </div>
      <div className="breadcrumb-content-top text-center">
        <ul className="meta-list justify-content-center mb--10">
          <li className="list-item">
            <div className="author-thumbnail">
              <img
                src="https://avatars.githubusercontent.com/u/63499572?v=4"
                alt="blog-image"
              />
            </div>
            <div className="author-info">
              <a href="#">
                <strong>Kartik Deshmukh</strong>
              </a>{" "}
            </div>
          </li>
          <li className="list-item">
            <i className="feather-clock" />
            <span>
            {(new Date(Number(blog?.posted) * 1000)).toLocaleDateString("en-IN", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}
            </span>
          </li>
        </ul>
        <h1 className="title" dangerouslySetInnerHTML={{ __html: blog?.title?.replace(/&#039;/g, "'") }}></h1>
      </div>
    </div>
    <div className="rbt-blog-details-area rbt-section-gapBottom breadcrumb-style-max-width">
      <div className="blog-content-wrapper rbt-article-content-wrapper">
        <div className="content">
          <div className="ratio ratio-16x9 alignwide mb--30">
            <img src={blog?.thumbnail}/>
          </div>
          <p>
            {blog?.description?.replace(/&#039;/g, "'")}
          </p>
          <br/><br/>
          <ReactMarkdown>
        {blog?.content?.replace(/BRNBLBR/g, '\n').replace(/&#039;/g, "'")}
        </ReactMarkdown>
          <br/>
          {/* BLog Tag Clound  */}
          <div className="tagcloud">
            {blog?.tags_array?.map((tag, index) => {
                return(
                    <a key={index} href="#">{tag}</a>
                )
            })}
          </div>
          {/* Social Share Block  */}
          <div className="social-share-block">
            <div className="post-like">
              <a href="#">
                <i className="feather feather-thumbs-up" />
                <span>{blog?.reaction?.count}</span>
              </a>
            </div>
            <ul className="social-icon social-default transparent-with-border">
              <li>
                <a href="https://www.facebook.com/">
                  <i className="feather-facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <i className="feather-twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <i className="feather-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.linkdin.com/">
                  <i className="feather-linkedin" />
                </a>
              </li>
            </ul>
          </div>
          {/* Blog Author  */}
          <div className="about-author">
            <div className="media">
              <div className="thumbnail">
                <a href={`https://noobspaces.social/${blog?.author?.username}`}>
                  <img
                    src={blog?.author?.avatar}
                    alt="Author Images"
                  />
                </a>
              </div>
              <div className="media-body">
                <div className="author-info">
                  <h5 className="title">
                    <a className="hover-flip-item-wrapper" href={`https://noobspaces.social/${blog?.author?.username}`}>
                      {blog?.author?.username}
                    </a>
                  </h5>
                </div>
                <div className="content">
                  <ul className="social-icon social-default icon-naked justify-content-start">
                    <li>
                      <a href="https://www.facebook.com/">
                        <i className="feather-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com">
                        <i className="feather-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/">
                        <i className="feather-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkdin.com/">
                        <i className="feather-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </Layout>
        )
}