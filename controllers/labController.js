const axios = require("axios");
const fs = require('fs');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
require('dotenv').config();

async function getKundliBirthData(birthDetails) {
  try {
    const response = await axios.post(
      "https://kundli2.astrosetalk.com/api/astro/get_birth_data",
      birthDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Kundli API error: ${err.response?.data?.message || err.message}`
    );
  }
}

const elevenlabs = new ElevenLabsClient({
  apiKey: 'sk_f55105a1321340fbd375fa8598df2c0ca907067ec96a5f95', // ✅ key pass करना ज़रूरी है
  environment: "https://api.elevenlabs.io",
});

async function generateVoiceResponse(text) {
  try {
    const audioStream = await elevenlabs.textToSpeech.convert(
      'JBFqnCBsd6RMkjVDRZzb', // voice_id
      {
        text,
        output_format: 'mp3_44100_128', // <- simplified
        modelId: "eleven_multilingual_v2",
      }
    );

    console.log('audio stream. :: ', audioStream);

    // Convert Web ReadableStream to Buffer
    const reader = audioStream.getReader();

    console.log
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks.map(v => Buffer.from(v)));

    fs.writeFileSync('audio.mp3', buffer);
    
  } catch (err) {
    throw new Error(
      `ElevenLabs API error: ${err.response?.data?.message || err.message}`
    );
  }
}

exports.kundliVoiceResponse = async (req, res) => {
  try {
    const { birthDetails } = req.body;

    const data = birthDetails || {
        "name": "Satya Tiwari",
        "day": "31",
        "month": "3",
        "year": "1987",
        "hour": "0",
        "min": "55",
        "place": "Motihari",
        "latitude": "26.6550589",
        "longitude": "84.8986636",
        "timezone": "5.5",
        "gender": "male"
    };

    // // 1. Kundli Data
    const kundliData = await getKundliBirthData(data);

    console.log('kundliData :: ', kundliData);

    // 2. Extract Meaningful Insight (TODO: implement properly)
    // const insight =
    //   "Aapke 5th house mein Shani hai, is wajah se delay hai. Har Saturday upay karein.";

    // // 3. Generate Voice from ElevenLabs
    // const audioBuffer = await generateVoiceResponse(insight);

    // res.set("Content-Type", "audio/mpeg");
    // res.send(audioBuffer);

    res.json({
      success: true,
      prediction_summary: kundliData.responseData.data || 'Prediction not available',
      raw: kundliData.responseData
    });
  } catch (error) {
    console.error("kundliVoiceResponse Error:", error);
    res.status(500).json({ error: error.message });
  }
};

