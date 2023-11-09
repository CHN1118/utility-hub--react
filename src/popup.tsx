import { useState } from "react"
import './style.css'
function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        width:357,
        height:600,
        display: "flex",
        flexDirection: "column",
      }}>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
      {/* <footer>fdsfsdf</footer> */}
    </div>
  )
}

export default IndexPopup
