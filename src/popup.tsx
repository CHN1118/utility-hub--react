import { useState } from "react"

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
      <h1>
         <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <footer>fdsfsdf</footer>
    </div>
  )
}

export default IndexPopup
