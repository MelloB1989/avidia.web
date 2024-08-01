import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import querygen from '@querygen';
import Skeleton from 'react-loading-skeleton';

export default function Courses({course_id}){
  
  const [projects, setprojects] = useState();
  const { loading, error, data } = useQuery(querygen("getCourseProject", course_id));
  
  useEffect(()=>{
    if(data) setprojects(data.listAvidiaProjectDetails.items)  
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
           {!(projects?.length === 0) ? projects?.map((project) => {
            return (
            <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href={`/projects/${course_id}/${project?.project_slug}`}>
                    <img
                      src={project.thumbnail}
                      alt="Avidia projects"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                <h1 className="rbt-card-title">
                    <a href={`/projects/${course_id}/${project?.project_slug}`}>{project.title}</a>
                  </h1>
                </div>
                <p><strong>{project.description}</strong></p>
              </div>
            </div>
            )
        }) : <h1>No projects available</h1>}
          </div>
        </div>
      </div>
      </div>
      )}
      </>
        )
}
