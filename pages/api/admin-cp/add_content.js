import addContent from '../../../lib/admin-cp/add_course_content';
import addStructure from '../../../lib/admin-cp/add_course_structure';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  
  if (req.body.password !== "Mellob1989@69ADMIN_AVIDIA") return res.status(401).end(); //Unauthorized

  //const { courseId, episodeName, lessonName, moduleName, moduleContent } = req.body;
  //console.log(req.body.courseId)

  try {
    const rep = await addStructure(req.body.courseId, req.body.episodeName, req.body.lessonName, req.body.moduleName);
    const result = await addContent(req.body.courseId, req.body.episodeId, req.body.episodeName, req.body.lessonId, req.body.lessonName, req.body.moduleId, req.body.moduleName, req.body.moduleContent);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error adding content: ', error);
    return res.status(500).json({ error: 'Failed to add content.' });
  }
};
