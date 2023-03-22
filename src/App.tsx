import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

function App() {

  const [viewPdf, setViewPdf] = useState("")
  const newplugin = defaultLayoutPlugin()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      let reader = new FileReader()
      const formData = new FormData(e.currentTarget);
      const selectedFile = formData.get("archivo") as File;
      reader.readAsDataURL(selectedFile)
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setViewPdf(result);
          console.log({result})
        }
      }
  }

  return (
    <div className="container">
        <form onChange={handleSubmit}>
          <input type="file" name="archivo" className='form-control'/>
          <button type='submit' className='btn btn-success'>VIEW PDF</button>
        </form>

        <h2>View PDF</h2>

        <div className='pdf-container'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
              {viewPdf && <>
                  <Viewer fileUrl={viewPdf} plugins={[newplugin]}/>
              </>}
              {!viewPdf && <>No PDF</>}    
          </Worker>
        </div>
    </div>
  );
}

export default App;
