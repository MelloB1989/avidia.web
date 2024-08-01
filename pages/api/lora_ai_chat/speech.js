
import axios from 'axios';
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'ap-south-1', // e.g., 'us-west-1'
});

const s3 = new AWS.S3();
export default async (req, res) => {

async function uploadToS3(data) {
  const audioId = uuidv4(); // generate a unique id for the audio file
  const params = {
    Bucket: 'au-spot',
    Key: `audio/${audioId}.mp3`, 
    Body: data,
    ContentType: 'audio/mpeg',
    ACL: 'public-read'  // so that the file can be accessed publicly
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location; // Returns the URL of the uploaded file
  } catch (error) {
    console.error("Error uploading to S3: ", error);
    return null;
  }
}

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const text = req.body.text;
    console.log(text)
    try {
        // This is a hypothetical API call - replace with actual OpenAI endpoint and method
        const apiResponse = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL?optimize_streaming_latency=0', 
        { "text": text.toString().replace(/'/g, "").replace(/"/g, "").replace(/\n/g, " "),
            "model_id" : "eleven_monolingual_v1",
            "voice_settings": {
    "stability": 0,
    "similarity_boost": 0,
    "style": 0.5,
    "use_speaker_boost": true
  }
        }, {
            headers: {
                'xi-api-key': 'bc2cdea4f3afaf64682332c48a4a1e57',//'5e467ebf38d5ec1103f80432e9d21164',
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'  // This is to tell axios to handle the response as a Blob
        });
        //console.log(apiResponse.data)
        /*
        res.setHeader('Content-Length', Buffer.byteLength(apiResponse.data));
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', 'audio/mpeg'); // Or whatever the audio format is
        return res.send(apiResponse.data);
        */
        const audioUrl = await uploadToS3(apiResponse.data);
if (audioUrl) {
  res.status(200).json({ audioUrl });
} else {
  res.status(500).send("Error uploading audio to S3");
}
    } catch (error) {
        return res.status(500).send(error);
    }
};
