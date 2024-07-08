import { useState } from "react";
import axios from "axios";
import "./weatherInfo.css";

const WeatherInfo = () => {
    const[city, setCity] = useState("")
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false)
    

    const getCityInfo = async() => {
        if(city === ''){
            alert("Please enter a city name");
            return;
        }

        setLoading(true)
        setWeather(null)

        const api_key = '6345e1b9570e4c5eb6c185526242702';
        const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;

        try {
            const response = await axios.get(url);
            setWeather(response.data)
        } catch (error) {
            alert("Failed to fetch weather data")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="container">
            {/* <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}> */}
            <input 
            type="text"
            value={city}
            placeholder="Eneter city name"
            onChange={(e) => setCity(e.target.value)} 
            />
            <button onClick={getCityInfo}>Search</button>
            {/* </div> */}
            
            {loading && <p>Loading data...</p>}
            {weather && (
                <div id="weather-cards" className="weather-cards">
                    <div className="weather-card">
                        <p>Temperature: {weather.current.temp_c} °C</p>
                        <p>Humidity: {weather.current.humidity} %</p>
                        <p>Condition: {weather.current.condition.text}</p>
                        <p>Wind Speed: {weather.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WeatherInfo;