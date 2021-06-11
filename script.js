const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const facebookBtn = document.getElementById("facebook")
const loader = document.getElementById("loader")
// Test the github connection

function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}
// Get Qoute from API
async function getQuote() {
  // show loader and hide quote container till getting a new quote complete
  showLoadingSpinner()
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const apiUrl = "https://type.fit/api/quotes/?method=getQuote&format=json"

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    let number = Math.floor(Math.random() * data.length)

    // if author is null add unknown
    if (data[number].author === null) {
      authorText.innerText = "Unknwon"
    } else {
      authorText.innerText = data[number].author
    }
    //Reduce the font size for long quotes
    if (data[number].text.length > 120) {
      quoteText.classList.add("long-quote")
    } else {
      quoteText.classList.remove("long-quote")
    }
    quoteText.innerText = data[number].text

    removeLoadingSpinner()
  } catch (error) {
    // getQuote();
    console.log("Whoops, no data!", error)
  }
}
//tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}  - ${author}`
  //open a new tab
  window.open(tweetUrl, "_blank")
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote)
twitterBtn.addEventListener("click", tweetQuote)

// On load
getQuote()
