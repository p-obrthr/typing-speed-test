import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import "/resources/css/typing.css";



function Word(props) {
    const { text, active, correct } = props;

    if (correct === true) {
        return <span className="correct">{text} </span>;
    }

    if (correct === false) {
        return <span className="incorrect">{text} </span>;
    }

    if (active) {
        return <span className="active">{text} </span>;
    }

    return <span>{text} </span>;
}

// Bessere Leistung während des erneuten Renderns
Word = React.memo(Word);

function Timer(props) {
    const { correctWords, startCounting, timeElapsed, setTimeElapsed } = props;

    useEffect(() => {
        if (startCounting) {
            const interval = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [startCounting, setTimeElapsed]);

    const minutes = timeElapsed / 60;

    return (
        <div className="row">
            <div className="col-md-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                </svg>
                <p style={{ display: "inline-block", marginLeft: "5px" }}>Time: {timeElapsed}</p>
            </div>
            <div className="col-md-6 text-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                    <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                </svg>
                <p style={{ display: "inline-block", marginLeft: "5px" }}>Speed: {((correctWords / minutes) || 0).toFixed(0)} WPM</p>
            </div>
        </div>
    );
}

function App() {
    const [generatedText, setGeneratedText] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [correctWordArray, setCorrectWordArray] = useState([]);
    const [ipsum, setIpsum] = useState("baconipsum");
    const [startCounting, setStartCounting] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    function getText() {
        reset();
        fetchContent();
    }

    function reset() {
        setActiveWordIndex(0);
        setCorrectWordArray([]);
        setStartCounting(false);
        setTimeElapsed(0);
    }

    function processInput(value) {
        if (!startCounting) {
            setStartCounting(true);
        }

        if (value.endsWith(' ')) {
            if (activeWordIndex === generatedText.length - 1) {
                setStartCounting(false);
                return;
            }

            setActiveWordIndex(index => index + 1);
            setUserInput(' ');

            setCorrectWordArray(data => {
                const word = value.trim();
                const newResult = [...data];
                newResult[activeWordIndex] = word === generatedText[activeWordIndex];
                return newResult;
            });
        } else {
            setUserInput(value);
        }
    }

    function selectIpsum(e) {
        const selectedIpsum = e.target.value;
        setIpsum(selectedIpsum);
    }

    async function fetchContent() {
        if (ipsum === "baconipsum") {
            try {
                let response = await fetch(`https://baconipsum.com/api/?type=all-meat&paras=` + 1 + `&start-with-lorem=1`);
                if (response.status === 200) {
                    let data = await response.json();

                    const trimmedText = data.map(word => word.trim());
                    const finalText = trimmedText.join(' ');
                    const sanitizedText = finalText.replace(/\s+/g, ' ');

                    setGeneratedText(sanitizedText.split(" "));
                } else {
                    alert("An error occurred");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (ipsum === "dinoipsum") {
            try {
                let response = await fetch(`https://dinoipsum.com/api/?format=text&paragraphs=` + 1);
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                let data = await response.text();
                const words = data.split(/\s+|\. /);
                setGeneratedText(words);
            } catch (error) {
                console.error(`${error}`);
            }
        }
        if (ipsum === "hipsum") {
            try {
                const response = await fetch(`http://hipsum.co/api/?type=hipster-centric&paras=` + 1);
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                const data = await response.json();
                const trimmedText = data.map(word => word.trim());
                const finalText = trimmedText.join(' ');
                const sanitizedText = finalText.replace(/\s+/g, ' ');

                setGeneratedText(sanitizedText.split(" "));
            } catch (error) {
                console.error(`${error}`);
            }
        }
    }


    return (
        
        

        <div className="App">


            <div className="container">
                <h1>TYPING SPEED TEST</h1>
                <div className="generator-head">
                    <div className="row px-5 py-5">
                        <div className="col-md-4">
                            <p>select your ipsum:</p>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="gen_options"
                                className="form-control select-container baconform"
                                onChange={selectIpsum}
                            >
                                <option value="baconipsum">baconipsum</option>
                                <option value="dinoipsum">dinoipsum</option>
                                <option value="hipsum">hipsum</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button
                                type="button"
                                id="gen-btn"
                                className="btn btn-primary btn_red"
                                onClick={getText}
                            >
                                get text
                            </button>
                        </div>
                    </div>
                </div>

                <div className="metrics-head">
                    <Timer
                        startCounting={startCounting}
                        correctWords={correctWordArray.filter(Boolean).length}
                        timeElapsed={timeElapsed}
                        setTimeElapsed={setTimeElapsed}
                    />
                </div>

                <div className="generator-body form-container">
                    <p>
                        {generatedText.map((word, index) => {
                            return <Word
                                key={index}
                                text={word}
                                active={index === activeWordIndex}
                                correct={correctWordArray[index]}
                            />;
                        })}
                    </p>
                </div>
            </div>
            <input
                type="text"
                className="form-control select-container custom-select my-1 mr-sm-2 userinput"
                value={userInput}
                onChange={(e) => processInput(e.target.value)}
                placeholder={generatedText.length === 0 ? '' : 'Start Typing!...'}
            />

<Helmet>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&family=Vina+Sans&display=swap');
        </style>
        </Helmet>


        </div>

    );
}

export default App;
