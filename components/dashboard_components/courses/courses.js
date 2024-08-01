import { useState } from 'react';
import MyCourses from './my_courses/mycourses';
import OtherCourses from './other_courses/othercourses';
export default function courses ( {user_data} ){
    const [activeTab, upActiveTab] = useState("mycourses");
    return (
        <>
        <ul className="nav nav-tabs my-3">
  <li className="nav-item">
    <a className={`nav-link ${activeTab === "mycourses" ? "active" : ""}`} aria-current="page" href="#" onClick={() => {upActiveTab("mycourses")}}>
      My courses
    </a>
  </li>
  <li className="nav-item">
    <a className={`nav-link ${activeTab === "othercourses" ? "active" : ""}`} onClick={() => {upActiveTab("othercourses")}} href="#">
      Other courses
    </a>
  </li>
</ul>
{activeTab === "mycourses" ? (<MyCourses user_data={user_data}/>) : (<OtherCourses user_data={user_data}/>)}
        </>
        )
}