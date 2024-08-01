import axios from 'axios';
import {UserContext} from '@/components/lms_components/layout/UserContext';
import Skeleton from 'react-loading-skeleton';
import get_jwt from '@/lib/frontend_functions/get_jwt';
import {useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/lms_components/layout/protected';

export default function FlaskDetails(){
    
    const router = useRouter();
    const { flaskID } = router.query;
    const { userData } = useContext(UserContext);
    const [flaskdetails, setFlaskD] = useState([]);
    const [apps, setApps] = useState([])
    let build = 0;
    
    useEffect(()=>{
        const req = async() => {
        if(userData && flaskID){
            const r = await axios.post('/api/labs/get_flask',{
                userid: userData?.username,
                token: get_jwt(),
                fid: flaskID
            },{
                headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
            });
            setFlaskD(r.data);
            build = r.data.data.length - 1;
            //console.log(build);
            setApps(r.data.data[build].resources[1].agents[0].apps);
            console.log(apps);
        }
        }
        req();
    }, [userData, flaskID]);
    return(
        <Layout title={flaskdetails?.data?.length > 0 ? `${flaskdetails.data[build].workspace_name} || Avidia Labs` : 'Avidia Labs'}>
  {/* End Side Vav */}
  <a className="close_side_menu" href="javascript:void(0);" />
  <div className="rbt-page-banner-wrapper">
    {/* Start Banner BG Image  */}
    <div className="rbt-banner-image" />
    {/* End Banner BG Image  */}
  </div>
  {/* Start Card Style */}
  <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          
        </div>
        <div className="col-lg-12 mt--30">
          <div className="profile-content rbt-shadow-box">
            <h4 className="rbt-title-style-3">Access your {flaskdetails?.data?.length > 0 ? `${flaskdetails.data[build].workspace_name}` : ''} Flask</h4>
            <div className="row g-5">
              <div className="col-lg-8">
                  {flaskdetails?.data?.length > 0 ? apps.map((app)=>{
                      return(<>
                     <a className="rbt-btn hover-icon-reverse" target="_blank" href={`https://${app.subdomain_name}.internal.avidia.site`}>
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">{app.display_name}</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                      </span>
                    </a>
                    <br/><br/>
                      </>
                      )
                  }) : <Skeleton height={50}/>}
                  
                  <br/>
                  {flaskdetails?.data?.length > 0 ? flaskdetails?.data[build].status === "stopped" ? (<>
                  <a className="rbt-btn hover-icon-reverse" href="#" onClick={async() => {
                      const r = await axios.post('/api/labs/start_flask',{
                          fid: flaskID,
                          tid: flaskdetails.template_version_id,
                          token: get_jwt()
                      },{
                          headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
                      })
                  }}>
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Start Flask</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right" />
                        </span>
                      </span>
                </a><br/><br/>
                  </>) : (<p></p>) : (<p></p>)}
                  Flask Status is {flaskdetails?.data?.length > 0 ? flaskdetails?.data[build].status : (<Skeleton/>)}
                
              </div>
              <div className="col-lg-2 offset-lg-2">
                <div className="feature-sin best-seller-badge text-end h-100">
                  <span className="rbt-badge-2 w-100 text-center badge-full-height">
                    <span className="image">
                      <img
                        src="https://noobsverse-internal.s3.ap-south-1.amazonaws.com/assets/cover-removebg-preview.png"
                        alt="Avidia Labs"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Card Style */}
  <div className="rbt-separator-mid">
    <div className="container">
      <hr className="rbt-separator m-0" />
    </div>
  </div>
</Layout>
        )
}