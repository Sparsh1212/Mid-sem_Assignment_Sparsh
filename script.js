var x=prompt('Welcome !! Please enter your name');
const random_Quote_Api_Url = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement=document.getElementById('quoteInput');
const timerElement=document.getElementById('timer');

quoteInputElement.addEventListener('input',()=>{
  const arrayQuote=quoteDisplayElement.querySelectorAll('span')
  const arrayValue=quoteInputElement.value.split('')
  let correct=true
  arrayQuote.forEach((characterSpan,index)=>{
      const character=arrayValue[index]
      if(character==null){
          characterSpan.classList.remove('correct');
          characterSpan.classList.remove('incorrect');
          correct=false
      }
      else if(character===characterSpan.innerText){
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
      }else{
        characterSpan.classList.add('incorrect')
        characterSpan.classList.remove('correct')
        correct=false
      }


  })
  if(correct) {
   
    function finished(){
    
    quoteDisplayElement.innerText='Congratulations!!! '+x+' Your score: '+Math.ceil(arrayQuote.length/getTimerTime())+' chars/s';
    quoteInputElement.style.display='none';
    timerElement.style.display='none';
      //  renderNewQuote()
        
    }
    finished()
  }

})
function getRandomQuote(){
return fetch(random_Quote_Api_Url)
.then(response => response.json())
.then(data => data.content)


}

async function renderNewQuote(){

  quoteDisplayElement.style.display='block';
  quoteInputElement.style.display='block';
  timerElement.style.display='block';
    const quote= await getRandomQuote()
    quoteDisplayElement.innerHTML='';
    quote.split('').forEach(character=>{
const characterSpan=document.createElement('span');

characterSpan.innerText=character
quoteDisplayElement.appendChild(characterSpan);

    })
    quoteInputElement.value=null;
    startTimer()
}
let startTime



function startTimer(){
    timerElement.innerText=0
    startTime = new Date()
    setInterval(()=>{
      timerElement.innerText=getTimerTime()
    },1000)

}
function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}




//renderNewQuote();
