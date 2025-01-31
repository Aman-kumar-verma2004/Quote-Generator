const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container')

// for loader if the responce came late;
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// to complete the loader if the responce came and now the quote will be shown 

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuotes() {
    
    const apiUrl = 'http://localhost:3000/quote';
    try {
        console.log('Fetching quote...');
        const response = await fetch(apiUrl);
        console.log('Received response:', response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const apiQuotes = await response.json();
        console.log('Parsed quote data:', apiQuotes);

        if (apiQuotes && apiQuotes.quote) {

            const quoteText = `"${apiQuotes.quote.body}"`;
            const quoteAuthor = `- ${apiQuotes.quote.author}`;

            document.getElementById("quote").innerText = quoteText;
            document.getElementById("author").innerText = quoteAuthor;

            document.getElementById("twitter").addEventListener("click", function() {
                // Create a tweet with the quote and author
                const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText + ' ' + quoteAuthor)}`;
                
                // Open the Twitter compose window
                window.open(tweetUrl, '_blank');
            });
        } else {
            alert('Quote data is missing.');
        }
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        alert('There was a problem fetching the quote. Please try again later.');
    }
    
}

// function tweetQuotes() {
//     const twitterUrl = `https://x.com/intent/tweet?text=${}`
// }


getQuotes();

// fetch and display every time you click on the button of "New Quote"
document.getElementById("new-quote").addEventListener("click", function() {
    getQuotes();  
});

