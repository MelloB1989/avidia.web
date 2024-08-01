import { useState, useEffect } from "react"

export default function Liner() {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    return(
        <>
        <div>
      <h1>Replace New Lines with BRNBLBR</h1>
      <form>
        <textarea
          value={input}
          onChange={(e)=>{
            setInput(e.target.value);
            const i = e.target.value.replace(/\n/g, 'BRNBLBR');
            setResult(i);
          }}
          rows="10"
          cols="50"
          placeholder="Enter text with new lines..."
        ></textarea>
        <br />
        <button type="submit">Replace New Lines</button>
      </form>
      {result && (
        <>
          <h2>Result</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{result}</p>
        </>
      )}
    </div>
        </>
    )
}