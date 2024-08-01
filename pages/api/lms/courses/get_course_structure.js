import get_course_structure from '../../../../lib/firestore/get_course_structure';
export default async function CourseStructure(req, res){
    if(req.method !== "POST") return res.status(500).json({error: "Unsupported method!"});
    else{
        const { courseId } = req.body;
        try{
            const course_structure = await get_course_structure(courseId);
            //console.log(course_structure);
            res.status(200).json({structure: course_structure});
        }
        catch(e){
            res.status(500).json({e})
        }
    }
}