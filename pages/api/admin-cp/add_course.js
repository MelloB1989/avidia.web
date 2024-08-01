import addCourse from '../../../lib/admin-cp/add_course';

export default async (req, res) => {
  if (req.method === 'POST') {
    //  console.log(req.body);
    const { data, course_id, password } = req.body;
    if(password != "SDSw4%RGSKTRtgnj4rewt44") res.status(401).json({error: "Access denied! fuck off!"});
    else{
    try {
      const dataObject = JSON.parse(data);
      await addCourse(dataObject, course_id);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error writing document: ', error);
      res.status(500).json({ success: false, error: error.message });
    }
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};