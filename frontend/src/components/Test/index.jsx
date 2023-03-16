import React, { useState  } from "react";
import bert from "../../assets/img/bert.png";
import axios from "axios";


const InputBox = ({ placeholder, value, onChange }) => {
  return (
    <div className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
      <div className="relative flex h-full flex-1 md:flex-col">
        <div className="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"></div>
        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
          <input
            className="outline-none m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
            style={{
              "max-height": "200px",
              height: "24px",
              "overflow-y": "hidden",
            }}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

const Button = ({ onClick }) => {

  return (
    <button
      onClick={onClick}
      className=" p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
    >
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-4 w-4 mr-1"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  );
};

const Message = ({ text, sender }) => {
  const bgColor = sender === "user" ? "white" : "bg-gray-100"
  return (
    <div className={bgColor + " w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800"}>
      <div className="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
        <div className="w-[30px] flex flex-col relative items-end">
          <div className="relative flex">
            <span
              style={{
                boxSizing: "border-box",
                display: "inline-block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: "0px",
                margin: "0px",
                padding: "0px",
                position: "relative",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: "0px",
                  margin: "0px",
                  padding: "0px",
                  maxWidth: "100%",
                }}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  src={bert}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: "0px",
                    margin: "0px",
                    padding: "0px",
                  }}
                ></img>
              </span>
              <img
                alt="Dong Dong"
                src={bert}
                className="rounded-sm"
                style={{
                  position: "absolute",
                  inset: "0px",
                  boxSizing: "border-box",
                  padding: "0px",
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: "0px",
                  height: "0px",
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              ></img>
            </span>
          </div>
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          <div className="flex flex-grow flex-col gap-3">
            <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
              {text}
            </div>
          </div>
          <div className="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
            <button className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          </div>
          <div className="flex justify-between"></div>
        </div>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const [inputQuestion, setInputValueQuestion] = useState("");
  const [inputContext, setInputContext] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesResponse, setResponseMessages] = useState([]);

  const handleQuestionChange = (event) => {
    setInputValueQuestion(event.target.value);
  };

  const handleContextChange = (event) => {
    setInputContext(event.target.value);
  };

  const handleSendClick = () => {
    if (inputQuestion !== "") {
      setMessages([
        ...messages,
        { question: inputQuestion, context: inputContext, sender: "user" },
      ]);

      axios({
        method: "post",
        url: "/api/v1/roberta_qa/predict",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          question: inputQuestion,
          context: inputContext,
        },
      })
        .then((response) => {
          const data = response.data;
          setResponseMessages([
            ...messagesResponse,
            { answer: data.answer, sender: "ai" },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
      
      setInputValueQuestion("");
      setResponseMessages([
        ...messagesResponse,
        { answer: "Waiting for BERT answering", sender: "ai" },
      ]);
      // setInputContext("");
    }
  };

  return (
    <div className=" bg-white rounded-lg shadow-lg p-4  overflow-y-auto" style={{ height: '400px' }}>
      {messages.map((message, index) => (
        <>
          <Message key={index} text={message.question} sender="user" />
          <Message
            key={index}
            text={messagesResponse[index].answer}
            sender="ai"
          />
        </>
      ))}
      <div className="fixed bottom-0 w-full bg-white">
        <div className="grid grid-cols-10">
          <div className="col-span-2"></div>
          <div className="col-span-6">
            <InputBox
              placeholder="Enter your context..."
              value={inputContext}
              onChange={handleContextChange}
            />
            <InputBox
              placeholder="Enter your question..."
              value={inputQuestion}
              onChange={handleQuestionChange}
            />
            <Button onClick={handleSendClick}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
