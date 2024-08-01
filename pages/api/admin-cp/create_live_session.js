import verifyToken from '../../../lib/jwt_verify';

export default async (req, res) => {
  if (req.method === 'POST') {
    const {
      session_id,
      session_name,
      session_agenda,
      session_tutor,
      session_start,
      session_end,
    } = req.body.session_data;
    const token = req.body.token;
    const course_id = req.body.course_id;
    
    if(!token) res.status(401).json({error: 'Provide valid token!'});
    
    const jwt_data = verifyToken(token);
    
    if(jwt_data.admin === "1"){
    try {
      await createLiveSession({
        sessionId: session_id,
        sessionName: session_name,
        sessionAgenda: session_agenda,
        sessionTutor: session_tutor,
        sessionStart: session_start,
        sessionEnd: session_end,
        courseId: course_id,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating live session: ', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
