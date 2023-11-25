import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div className="App">
          <div class = "container">
              <h1>TYPING SPEED TEST</h1>
                <div class = "generator-head">
                    <div class="row px-5 py-5">
  
                        <div class="col-md-4">
                            <p>selec your ipsum:</p>
                      </div>
                      <div class="col-md-4">
                              <select 
                                name = "gen_options" 
                              class = "form-control select-container baconform"
                              onChange={selectIpsum}
                              >
                                <option value = "baconipsum">baconipsum</option>
                                <option value = "dinoipsum">dinoipsum</option>
                                <option value = "hipsum">hipsum</option>
                                </select>
                      </div>
  
                      <div class="col-md-4">
                        <button 
                            type = "button" 
                            id = "gen-btn" 
                            class = "btn btn-primary btn_red"
                            onClick={getText}
                        >
                            get text
                        </button>
                      </div>
                      </div>
  
                  </div>
                    
  
                  <div class = "metrics-head">
                          <Timer 
                              startCounting={startCounting}  
                              correctWords={correctWordArray.filter(Boolean).length} 
                              timeElapsed={timeElapsed}
                              setTimeElapsed={setTimeElapsed}
                          />
                      </div>
              
    
                <div class = "generator-body form-container">
                <p>	
                  {generatedText.map((word, index) => {
                      return <Word 
                                  text={word}
                                  active={index === activeWordIndex} 
                                  correct={correctWordArray[index]}
                              />
                  })} 
                </p>
                </div>
          </div>
          <input 
              type="text" 
              class = "form-control select-container custom-select my-1 mr-sm-2 userinput"
              value= {userInput} 
              onChange= {(e) => processInput(e.target.value)} 
              placeholder={generatedText.length === 0 ? '' : 'Start Typing!...'}
          />
        </div>
        );
}
