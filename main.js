

const getApiData = () => {
  $.getJSON('https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true', (usaData)=>{
    generateUSA(usaData.totalDeaths, usaData.totalCases)
    // console.log(usaData)
  })
  $.getJSON('https://api.apify.com/v2/datasets/xF9o1iiT0vqTXDy4T/items?format=json&clean=1&limit=1&desc=1', (laData)=>{
    generateLA(laData[0].deaths, laData[0].cases)
    // console.log(laData)
  })
  let newsURL = `https://newsapi.org/v2/everything?from=2020-03-25&domains=cnn.com,nytimes.com,bbc.com,nypost.com&q="COVID"&language=en&apiKey=c36e4f51b8e64d31a716b152d51c1642`
  let fetchReq = new Request(newsURL)
  fetch(fetchReq)
    .then(response => {
      return response.json()
    }).then(data => { 
      generateArticles(data)
  }); 
    
}

getApiData()

const generateLA = (deaths, confirmed) => {
  const laDeaths = document.querySelector('.la-deaths');
  const laConfirmed = document.querySelector('.la-confirmed');
  const laDeathsElement = document.createElement('p')
  const laConfirmedElement = document.createElement('p')
  laDeathsElement.textContent = `${deaths}`
  laConfirmedElement.textContent = `${confirmed}`
  laDeaths.appendChild(laDeathsElement)
  laConfirmed.appendChild(laConfirmedElement)
}

const generateUSA = (deaths, confirmed) => {
  const usaDeaths = document.querySelector('.usa-deaths');
  const usaConfirmed = document.querySelector('.usa-confirmed');
  const usaDeathsElement = document.createElement('p')
  const usaConfirmedElement = document.createElement('p')
  usaDeathsElement.textContent = `${deaths}`
  usaConfirmedElement.textContent = `${confirmed}`
  usaDeaths.appendChild(usaDeathsElement)
  usaConfirmed.appendChild(usaConfirmedElement)
}

const generateArticles = (data) => {
  for(let i = 0; i < 5; i++){
    let article = data['articles'][i]
    $('.articles').append(`
      <div class="article">
        <div class="article-image">
          <img class="thumb" src="${article.urlToImage}"></img>
        </div>
        <div class="article-content">
          <h4>${article.title}</h4>
          <p>${article.description}</p>
        </div>
      </div>  
    `)  
  }
}