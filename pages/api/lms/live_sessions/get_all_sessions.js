import verifyToken from '../../../../lib/jwt_verify';
import { getLiveSessions } from '../../../../lib/firestore/live_sessions/getAll';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { course_id, token } = req.body;
      
      // Verify the JWT token
      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      
      // Get the live sessions from Firestore
      const liveSessions = await getLiveSessions(course_id);
      if (!liveSessions) {
        return res.status(404).json({ error: 'No live sessions found' });
      }
      
      // Sort the sessions into upcoming, current, and past
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in Unix epoch seconds
      const upcoming = [];
      const current = [];
      const past = [];
      
      liveSessions.forEach(session => {
        if (session.session_start > currentTimestamp) {
          upcoming.push(session);
        } else if (session.session_start <= currentTimestamp && session.session_end >= currentTimestamp) {
          current.push(session);
        } else {
          past.push(session);
        }
      });
      
      // Return the sorted arrays
      res.status(200).json({ upcoming, current, past });

    } catch (error) {
      console.error('Error fetching live sessions: ', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
