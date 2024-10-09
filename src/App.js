
import './App.css';

import { useState } from 'react';
const App = () => {
  const [image, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const supriseOptions = [
    'Does the image have a whale?',
    'Is the image a dog?',
    'Is the image a cat?',
    'Is the image a human?',
    'Is the image a bird?',
    'Is the image a car?',
  ]

  const suprise = async () => {
    const randomValue = supriseOptions[Math.floor(Math.random() *supriseOptions.length)] 
    setValue(randomValue)
  }

  const uploadImage =  async(e) => {
    const formData = new FormData()
    setImage(e.target.files[0])
    formData.append('file', e.target.files[0])
    setImage(e.target.files[0])

    try{
      const options = {
        method: 'POST',
        body: formData
      }

      const response = await fetch('http://localhost:8000/upload', options)
      const data = response.json()
      console.log(data)
    } catch(err){
      console.error(err)
      
    }

  }
  console.log(image)
  
 const analyzeImage = async () => {
  if (!image) {
    setError("Please upload an image first")
    return
  }

  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('http://localhost:8000/gemini', options)
    const data = await response.text()
    setResponse(data)

  } catch (err) {
    console.error(err)
    setError("An error occurred while analyzing the image")
  }

 }

 const clear = () => {
   setValue("")
   setResponse("")
   setError("")
   setImage(null)
 }
  return (

    <div className="App">
      <header>
        <h1 style={{ textAlign: 'center' }}>Image Analysis with AI</h1>
        <p style={{ textAlign: 'center' }}>Upload an image and ask questions about it!</p>      </header>
      <section className="search-section">
        <div className='image-container'>
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
        </div>
        <p className="extra-info">
          <span>
            <label htmlFor="files" className="upload-button">Upload image</label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" />
          </span>
        </p>
        <p>What do you want to know about the image?
          <button className="suprise" onClick={suprise} disabled={response}>Surprise me</button>
        </p>

        <div className="input-container">
          <input 
            value={value}
            placeholder='What is in the image...'
            onChange={e => setValue(e.target.value)}
            />
            {(!response && !error) && <button onClick={analyzeImage}>Ask me</button>}
            {(response || error) && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p className="error-message">{error}</p>}
        {response && <div className="response-container">
          <h2>AI Analysis:</h2>
          <p>{response}</p>
        </div>}
      </section>
    </div>
  );
}


export default App;
