let form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {

    event.preventDefault();

    let input = document.querySelector('.searchForm-input').value;

    let searchQuery = input.trim();
    try {
        await fetchResults(searchQuery);
    } catch (err) {
        console.log(err);
    }
}

async function fetchResults(searchQuery) {
    let endpoint = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    let response = await fetch(endpoint);
    let responseJson = await response.json();
    let results = responseJson["query"]["search"];
    displayResults(results);
}

function displayResults(results) {

    let searchResults = document.querySelector('.searchResults')

    searchResults.innerHTML = '';

    results.forEach(result => {
        let endpoint = encodeURI(`https://fr.wikipedia.org/wiki/${result["title"]}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
          <h3 class="resultItem-title smoke">
            <a href="${endpoint}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <span class="resultItem-snippet">${result.snippet}</span><br>
          <a href="${endpoint}" class="resultItem-link" target="_blank" rel="noopener">${endpoint}</a>
        </div>`
        );
    })
}