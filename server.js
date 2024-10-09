const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();  // Corrected this line
const fs = require('fs');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure the API key is loaded from the environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);  // Use status(500) for server errors
        }
       filePath = req.file.path;  // Use `const` for filePath
       
    });
});

app.post('/gemini', async (req, res) => {
    try {
        function fileToGenerativePart(path, mimeType) {
            return {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                    mimeType
                }
            }
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"})
        const prompt = req.body.message
        const result = await model.generateContent([prompt, fileToGenerativePart(filePath, "image/jpeg")])
        const response = await result.response
        const text = response.text()
        res.send(text)
        //console.log(prompt)
    } catch (err) {
        console.error(err);
    }
})
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);  // Added a space for readability
});
