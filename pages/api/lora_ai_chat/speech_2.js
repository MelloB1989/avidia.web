// Imports the Google Cloud client library
//export GCLOUD_PROJECT=massive-hexagon-396213
const textToSpeech = require('@google-cloud/text-to-speech');
//const translate = require('@google-cloud/translate').v3beta1;
//const vision = require('@google-cloud/vision');

// Import other required libraries
const fs = require('fs');
//const escape = require('escape-html');
const util = require('util');
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
    
    try {
        const client = new textToSpeech.TextToSpeechClient();
        const ssml = req.body.ssml;

        const request = {
            input: { ssml: ssml },
            voice: {
                languageCode: 'en-US',//'te-IN'//'en-IN'//'en-US'
                name: 'en-US-Standard-F',//'te-IN-Standard-A'//'en-IN-Standard-D'//'en-US-Standard-F'
                ssmlGender: 'FEMALE'
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: 3.4,
                speakingRate: 1.1
            }
        };

        const [response] = await client.synthesizeSpeech(request);

        const audio = response.audioContent;

        // Write audio content to a file
        //const audioPath = '/home/ec2-user/environment/output.mp3';
        //fs.writeFileSync(audioPath, audio, 'binary');
        const audioUrl = await uploadToS3(audio);
        res.status(200).send({ status: 'success', audioUrl: audioUrl });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}