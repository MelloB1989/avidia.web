const NBSP_KEY = process.env.NBSP_KEY;
const API_URL = 'https://spaces.noobsverse.com/api';

export default async (req, res) => {
  if (req.method === 'POST') {
      const userId = req.body.userId;
   //Preparing request body
        const formData = new URLSearchParams();
        formData.append('user_id', userId);
        formData.append('fetch', 'user_data');
        formData.append('server_key', NBSP_KEY);
        //console.log(payload)
        //Sending request
        const response = await axios.post(`${API_URL}/get-user-data?access_token=${accessToken}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the appropriate content type for form data
        },
      });
        if(response.data.api_status === 200){
            res.status(200).json({ data: response.data })
        }
        if(response.data.api_status === 404 || response.data.errors) res.status(200).json({ error: response.data.errors })
        
        else res.status(500).json({ error : "Unexpected error" })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};