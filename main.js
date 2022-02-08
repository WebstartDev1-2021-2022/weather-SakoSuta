// TODO: Récupérer les éléments du DOM dans des constantes 

// Constant
const tempImg = document.querySelector("tempImg")
const lieu = document.querySelector(".lieu")
const temp = document.querySelector(".temp")

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
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
        const data = await res.json()

        // console.log(data)
        updateUI(data)

        temp.innerText = `${Math.trunc(data.current.temp)}°`
    } 
    catch(error)
    {
        console.error('Erreur dans le getWeatheerOf() ~>', error);
    }
}

const updateUI = (data) => 
{
    console.log(data);
}

const TempsActuel


// Récupérer la géolocalisation de l'utilisateur et faire la requ^te à l'API
navigator.geolocation.getCurrentPosition( 
    getWeatherOf, 
    (error) => console.log('getCurrentPosition error ~>', error), 
    {timeout: 1000}
)