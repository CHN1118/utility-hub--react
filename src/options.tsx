import { useState } from "react"
import "./style.css"



function IndexOptions() {

  
  document.title = "UtilityHub Notifications";
  const [data, setData] = useState("")
  const [account, setAccount] = useState("")
  const [messageId, setMessageId] = useState("")
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GREETING') {
      setAccount('Hello from the options page!')
      setMessageId(request.messageId);
    }
  });
  
  const one = () => {
    chrome.runtime.sendMessage({ type: 'GET_ACCOUNT' ,message:'0xEAD434534',messageId: messageId });
  }
  return (
    <div
      onClick={one}
      >
      <h1>{account}</h1>
      <h1>{data}</h1>
      <h1>{messageId}</h1>
    </div>
  )
}

export default IndexOptions
