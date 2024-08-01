import Layout from '@/components/lms_components/layout/common';
import {useQuery} from '@apollo/client';
import {listInstructors} from '@queries';
import {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';

export default function InstructorsPage(){
    const [mentors, setMentors] = useState();
    const {loading, error, data} = useQuery(listInstructors);
    useEffect(()=>{
    if(data) setMentors(data.listInstructors.items);
    }, [data]);
    //console.log(data.listInstructors.items[0]);
    return(
        <Layout title="Instructors at Avidia">
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  {/* Start breadcrumb Area */}
  <div className="rbt-breadcrumb-default ptb--100 ptb_md--50 ptb_sm--30 bg-gradient-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb-inner text-center">
            <h2 className="title">Our expert Instructors</h2>
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right" />
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Instructors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumb Area */}
  <div className="rbt-team-area bg-color-extra2 rbt-section-gap">
    <div className="container">
      <div className="row g-5">
        {/* Start Single Team  */}
        {loading ? (
        <>
        <div className="col-lg-3 col-md-6 col-12">
          <div className="rbt-team team-style-default style-three small-layout rbt-hover">
            <div className="inner">
              <div className="thumbnail">
                <Skeleton height={150} />
              </div>
              <div className="content">
                <h4 className="title"><Skeleton count={4} /></h4>
                <h6 className="subtitle theme-gradient"><Skeleton/></h6>
                <span className="team-form">
                  <i className="feather-map-pin" />
                  <span className="location"><Skeleton/></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <div className="rbt-team team-style-default style-three small-layout rbt-hover">
            <div className="inner">
              <div className="thumbnail">
                <Skeleton height={150} />
              </div>
              <div className="content">
                <h4 className="title"><Skeleton count={4} /></h4>
                <h6 className="subtitle theme-gradient"><Skeleton/></h6>
                <span className="team-form">
                  <i className="feather-map-pin" />
                  <span className="location"><Skeleton/></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <div className="rbt-team team-style-default style-three small-layout rbt-hover">
            <div className="inner">
              <div className="thumbnail">
                <Skeleton height={150} />
              </div>
              <div className="content">
                <h4 className="title"><Skeleton count={4} /></h4>
                <h6 className="subtitle theme-gradient"><Skeleton/></h6>
                <span className="team-form">
                  <i className="feather-map-pin" />
                  <span className="location"><Skeleton/></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12">
          <div className="rbt-team team-style-default style-three small-layout rbt-hover">
            <div className="inner">
              <div className="thumbnail">
                <Skeleton height={150} />
              </div>
              <div className="content">
                <h4 className="title"><Skeleton count={4} /></h4>
                <h6 className="subtitle theme-gradient"><Skeleton/></h6>
                <span className="team-form">
                  <i className="feather-map-pin" />
                  <span className="location"><Skeleton/></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        </>
        ) : (
        <>
        {mentors?.map((item)=>{return (
        <div className="col-lg-3 col-md-6 col-12" key={item.id}>
          <div className="rbt-team team-style-default style-three small-layout rbt-hover">
            <div className="inner">
              <div className="thumbnail">
                <img
                  src={item.profile}
                  alt={item.name}
                  height="150px"
                />
              </div>
              <div className="content">
                <h4 className="title"><a href={`https://spaces.noobsverse.com/${item.nbspUsername}`} target="_blank">{item.name}</a></h4>
                <h6 className="subtitle theme-gradient">{item.designation}</h6>
                <span className="team-form">
                  <span className="location">{item.description}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        )})}
        </>
        )}
        {/* End Single Team  */}
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
</Layout>
        )
}