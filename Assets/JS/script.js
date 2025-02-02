const API = 'bcd24eda6025291e8b312d12b4a48814';
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
function getData() {
    let city = searchInput.value.trim();
    const apiUrl = https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API};
    fetch(apiUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            renderCurrentWeather(city, data);
            storeSearchHistory(city);
           
        })
        .catch(function (error) {
            console.error(error);
        });

}

function renderCurrentWeather(city, weather) {
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity
    const icon = weather.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    const container = document.getElementById('container');
    const tempH1 = document.createElement('h1');
    const windH1 = document.createElement('h1');
    const humidH1 = document.createElement('h1');
    const iconImg = document.createElement('img');
    tempH1.textContent = temp;
    windH1.textContent = wind;
    iconImg.setAttribute("src", iconUrl);
    humidH1.textContent = humid;
    container.append(iconImg, tempH1, windH1, humidH1);
    createHistoryButton();



}
function storeSearchHistory(){
    storedCities.push(city);
    localStorage.setItem('cities', JSON.stringify(storedCities));   
}

function handleSearchHistory(e) {
    if (!e.target.matches('.historybtn')) {
        return;
    }
    const target = e.target;
    const cityName = target.textContent;
    getData(cityName);

}

createHistoryButton();
btnContainer.addEventListener('click', handleSearchHistory);

searchButton.addEventListener('click', getData);


