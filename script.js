// Toggle the sidebar when the open/close button is clicked
document.querySelector('.open-btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.add('open');
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.remove('open');
});


// Function to reset highlights
function resetHighlights() {
    const origamiItems = document.querySelectorAll('.grid .origami');
    origamiItems.forEach(item => {
        const h3Text = item.querySelector('h3');
        const originalHTML = h3Text.innerHTML;  // Get the original HTML to restore later
        h3Text.innerHTML = originalHTML;  // Reset to original content (remove highlights)
    });
}

// Function to search content inside the .grid > .origami > h3 and highlight matched words
function searchContent() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const origamiItems = document.querySelectorAll('.grid .origami'); // Get all origami items
    const searchResults = document.getElementById('search-results-list');
    searchResults.innerHTML = ''; // Clear previous results

    // If the search box is empty, reset the highlights and return early
    if (query.trim() === '') {
        resetHighlights();  // Reset all highlights
        return;  // Do not proceed with search if query is empty
    }

    // Reset the highlighting on all items
    origamiItems.forEach(item => {
        const h3Text = item.querySelector('h3'); // Get the <h3> text
        const originalText = h3Text.textContent; // Get the text content without HTML
        const originalHTML = h3Text.innerHTML;  // Get the original HTML to restore later

        const regex = new RegExp(`(${query})`, 'gi'); // Create case-insensitive regex

        // If the query matches the text in <h3>, highlight it
        if (query && originalText.toLowerCase().includes(query)) {
            // Reset content and remove previous highlights
            h3Text.innerHTML = originalHTML;

            // Replace the matched text with the highlight span only once
            const highlightedContent = originalText.replace(regex, function(match) {
                return `<span class="highlight">${match}</span>`;
            });

            // Set the HTML with the new highlighted content
            h3Text.innerHTML = highlightedContent;

            // Show the search result in the sidebar
            const resultItem = document.createElement('li');
            resultItem.textContent = `Found match in: ${originalText}`;
            resultItem.addEventListener('click', function() {
                // Scroll to the element containing the matched text
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Focus on the element to emphasize it
                setTimeout(function() {
                    item.querySelector('h3').focus();
                }, 300);
            });
            searchResults.appendChild(resultItem);
        } else {
            // Reset text if there's no match
            h3Text.innerHTML = originalHTML;
        }
    });

    // If no results were found, display a message
    if (searchResults.children.length === 0) {
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'No matches found';
        searchResults.appendChild(noResultItem);
    }
}
