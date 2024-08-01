export default function chat_bubbles({conversation}){
    return(
        <>
        {conversation?.map((msg, index) => (
  <div style={{ position: "relative", overflowY: "auto" }}>
              <div key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>
                {msg.fromUser ? (
                <>
                <div className="d-flex justify-content-between">
            </div>
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                  {msg.text}
                </p>
              </div>
              <img
                className="rounded-circle"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="user"
                style={{ width: 45, height: "100%" }}
              />
            </div>
                </>
                ):(
                <>
                <div className="d-flex justify-content-between">
              <p className="small mb-1">Lora AI</p>
            </div>
            <div className="d-flex flex-row justify-content-start">
              <img
                src="https://cdn.global.noobsverse.com/lisa1.jpg"
                alt="Lora AI"
                style={{ width: 45, height: "100%" }}
              />
              <div>
                <p
                  className="small p-2 ms-3 mb-3 rounded-3"
                  style={{ backgroundColor: "#f5f6f7" }}
                >
                  {msg.text}
                </p>
              </div>
            </div>
                </>
                )
                }
              </div></div>
            ))}
        </>
        )
}