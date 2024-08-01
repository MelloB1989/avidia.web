import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Skeleton from 'react-loading-skeleton';

export default function Courses({course_id}){
  
  const [handouts, sethandouts] = useState();
  const { loading, error, data } = useQuery(querygen("getCourseHandouts", course_id));
  
  useEffect(()=>{
    if(data) sethandouts(data.listHandouts.items)  
  }, [data]);
    //console.log(courses?.length);
    return(
        <>
        {loading? (<Skeleton height={300}/>) : (<div className="col-lg-9">
      <div className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home-4"
          role="tabpanel"
          aria-labelledby="home-tab-4"
        >
          <div className="row g-5">
           {!(handouts?.length === 0) ? handouts?.map((handout) => {
            return (
            <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href={handout?.url} target="_blank">
                    <img
                      src="https://img.icons8.com/color/96/books.png"
                      alt="Avidia Handouts"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                <h1 className="rbt-card-title">
                    <a href={`https://docs.google.com/gview?url=${handout?.url}&embedded=true`} target="_blank">{handout.name}</a>
                  </h1>
                </div>
                <p>Regards: <strong>{handout.description}</strong></p>
              </div>
            </div>
            )
        }) : <h1>No handouts available</h1>}
          </div>
        </div>
      </div>
      </div>
      )}
      </>
        )
}
