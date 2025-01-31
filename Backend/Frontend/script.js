

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
            document.getElementById("quote").innerText = `"${apiQuotes.quote.body}"`;
            document.getElementById("author").innerText = `- ${apiQuotes.quote.author}`;
        } else {
            alert('Quote data is missing.');
        }
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        alert('There was a problem fetching the quote. Please try again later.');
    }
}

getQuotes();

// fetch and display every time you click on the button of "New Quote"
document.getElementById("new-quote").addEventListener("click", function() {
    getQuotes();  
});