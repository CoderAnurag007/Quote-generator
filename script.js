
// dom manipulation  

const quotecontainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const AuthorText= document.getElementById('author');
const twitterbtn= document.getElementById('twitter');
const newQuotebtn= document.getElementById('new-quote');
const loader=document.getElementById('loader');


let apiQuotes = [];

// loading and complete function 

// show 
function loading() {
    loader.hidden= false;
    quotecontainer.hidden= true;

}
//  hide 
function complete() {
    quotecontainer.hidden= false;
    loader.hidden= true;
}

// new quote 
function newQuotes() {
    loading();
    // pick a random quote 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    // check if author content is not present
  if (!quote.author) {
    AuthorText.textContent= 'Unknown';
      
  }
  else{
    AuthorText.textContent=quote.author;
  }

// check if quote is very long 
if (quote.text.length>100) {
    quoteText.classList.add('long-quote');
}
else{
    quoteText.classList.remove('long-quote');
}
//  set quote and hide loader 
    quoteText.textContent=quote.text;

    complete();
}

// get quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuotes();


    } catch (error){
        // catch error 
    }
}



// tweet code quote 

function tweetquote(){
    const tweeturl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${AuthorText.textContent}`;
    window.open(tweeturl,'_blank');
}

// event listener 

newQuotebtn.addEventListener('click' , newQuotes);
twitterbtn.addEventListener('click',tweetquote );

// load
getQuotes();
