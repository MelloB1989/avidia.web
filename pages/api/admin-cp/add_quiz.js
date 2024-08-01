// pages/api/upload.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Forward the request to the actual API
      const result = await axios({
        method: "post",
        url: "https://karma-files-jd.coffeecodes.in/upload",
        file: req.body,
        headers: {
          "Content-Type": req.headers["content-type"],
          // Forward any additional headers needed
        },
      });

      // Send back the response from the target API
      res.status(200).json(result.data);
    } catch (error) {
      // Handle errors
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || { message: "An error occurred" });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
