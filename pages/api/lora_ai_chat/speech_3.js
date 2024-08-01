import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "",
});
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
    Bucket: 'noobsverse-internal',
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
    
    try {
        const ssml = req.body.ssml;
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: ssml,
          });
          const buffer = Buffer.from(await mp3.arrayBuffer());
          //await fs.promises.writeFile(speechFile, buffer);
        const audioUrl = await uploadToS3(buffer);
        res.status(200).send({ status: 'success', audioUrl: audioUrl });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}