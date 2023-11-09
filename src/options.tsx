import { useState } from "react"
import "./style.css"
function IndexOptions() {
  const [data, setData] = useState("")
  const one = () => {
    chrome.runtime.sendMessage({ type: 'GET_ACCOUNT' ,message:'0xEAD434534'});
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}
      onClick={one}
      >
        dsfsdf
    </div>
  )
}

export default IndexOptions
