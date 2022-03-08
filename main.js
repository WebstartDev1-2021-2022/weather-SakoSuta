// TODO: Récupérer les éléments du DOM dans des constantes 

// Constant
const tempImg = document.querySelector(".tempImg")
const lieu = document.querySelector(".lieu")
const temp = document.querySelector(".temp")
const heure = document.querySelectorAll(".heure")
const jour = document.querySelectorAll(".jour")

// Requête fetch
const apiKey = "3fd72506573bbc8268962948af289955"

// Traiter les erreurs de navigator.geolocation.getCurrentPosition
const handleGetCurrentPositionError = (error) => 
{
    alert("Votre géolocalisation ne fonctionne pas, vérifiez vos paramètres.")
}

const getWeatherOf = async (position) => 
{
    try
    {
        const {latitude, longitude} = position.coords

        const allPromise = Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`),
            fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
        ])

        const results = await allPromise
        const weatherData = await results[0].json()
        const cityData = await results[1].json()

        // Temps Actuel
        temp.innerText = `${Math.trunc(weatherData.current.temp)}°`
        lieu.innerText = `${cityData.features[0].properties.city}`
        tempImg.src = `img/${weatherData.current.weather[0].icon}.svg`

        // Temps par Heure
        for(let th=0; th < 24; th++)
        {
            heure[th].innerHTML = `<p class="tempH">${new Date(weatherData.hourly[th].dt * 1000).getHours()}h</p>
                                  <img src="img/${weatherData.hourly[th].weather[0].icon}.svg" alt="Temps_par_heure">
                                  <p class="tempH">${Math.trunc(weatherData.hourly[th].temp)}°</p>`
        }

        let week = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

        for(let tj=0; tj < 5; tj++)
        {
            let dt_day = new Date(weatherData.daily[tj].dt * 1000).getDay()
            jour[tj].innerHTML = `<p class="tempSJ">
                                    ${week[dt_day]}
                                  </p>
                                  <img src="img/${weatherData.daily[tj].weather[0].icon}.svg" alt="Temps_par_jour">
                                  <p class="tempSMM">
                                  Min : ${Math.trunc(weatherData.daily[tj].temp.min)}
                                  ° | 
                                  Max : ${Math.trunc(weatherData.daily[tj].temp.max)}°</p>`
        }

        console.log(weatherData,cityData);
    } 
    catch(error)
    {
        console.error('Erreur dans le getWeatheerOf() ~>', error);
    }
}

// Récupérer la géolocalisation de l'utilisateur et faire la requ^te à l'API
navigator.geolocation.getCurrentPosition( 
    getWeatherOf, 
    (error) => console.log('getCurrentPosition error ~>', error), 
    {timeout: 1000}
)