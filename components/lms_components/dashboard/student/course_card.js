import { useRouter } from 'next/router';

export default function CourseCard( {course_detail, course_id} ){
  const router = useRouter();
    return (
         <>
         {/* Start Single Course  */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <a href="course-details.html">
                    <img
                      src={course_detail.thumb}
                      alt="Card image"
                    />
                  </a>
                </div>
                <div className="rbt-card-body">
                  <h4 className="rbt-card-title">
                    <a href={`/courses/view/${course_id}`}>{course_detail.name}</a>
                  </h4>
                  <div className="rbt-progress-style-1 mb--20 mt--10">
                    <div className="single-progress">
                      <h6 className="rbt-title-style-2 mb--10">Complete</h6>
                      <div className="progress">
                        <div
                          className="progress-bar wow fadeInLeft bar-color-success"
                          data-wow-duration="0.5s"
                          data-wow-delay=".3s"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={90}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                        <span className="rbt-title-style-2 progress-number">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rbt-card-bottom">
                    <a
                      className="rbt-btn btn-sm bg-primary-opacity w-100 text-center"
                      onClick={(e) => {e.preventDefault; router.push(`/courses/view/${course_id}`)}}
                      
                    >
                     View
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Course  */}
            </>
        )
}