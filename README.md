# Weather Forecast Dashboard
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Overview

Weather Dashboard is a dynamic web application that provides users with real-time weather data, including forecasts, temperature, humidity, and wind speed. Utilizing the OpenWeatherMap API, this application delivers accurate and up-to-date weather information for cities around the globe.

## Features

- **Current Weather Data:** Displays temperature, humidity, wind speed, and more for the selected city.
- **Five-Day Forecast:** Offers an extended forecast showing upcoming weather conditions.
- **Search Functionality:** Allows users to search for cities worldwide and view their current and future weather conditions.
- **Search History:** Keeps a record of recent searches for quick access to previously viewed cities.
- **Responsive Design:** Ensures a seamless experience across various devices and screen sizes.

**Example: Searching for Tokyo, Japan in Light Mode:**

![Tokyo, JP with light theme](assets/images/light-theme_TokyoJP_search.jpeg "Example search and light mode demonstration.")

**Example: Searching for Tokyo, Japan in Dark Mode:**

![Tokyo, JP with dark theme](assets/images/dark-theme_TokyoJP_search.jpeg "Example search and dark mode demonstration.")

**Example: Searching by City Name and using string-matching autocompletion:**

![Searching by City Name](assets/images/light-theme_search_functionalities.jpg "Demonstrates searching by city name and using the autocompletion feature.")

**Example: Searching by Zip Code:**

_Note that autocompletion does not function for Zip Code queries._

![Searching by Zip Code](assets/images/light-theme_zipcode_functionality.jpg "Demonstrates searching by zip code rather than city name.")

![Results from Zip Code search](assets/images/light-theme_92122_zipcode-search.jpeg "Full app image of a zip code search.")


## Unresolved Issues

- Autocomplete suggestions tend to include locations that do not match the search string (e.g., Typing in `New York` also returned `Lake Oswego, Oregon, US`). Additionally, autocomplete may not match cities to the search string until the user fully types out the city name.

- Issues with OpenWeather API unpredictably returning temperatures in Kelvin or Celsius, rather than Fahrenheit, which may sabotage the temperature conversion function in `helpers.js`.

- Toggling between Dark Mode and Light Mode displaces the positioning of the header, causing gaps on the edges of the screen.


## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository to your local machine:
   ```sh
   git clone git@github.com:lifeofmatsu/matsu-weather-forecast.git
   cd matsu-weather-forecast


## Usage

- Open the `index.html` file in your web browser, or set up a local server to host the application.
- To search for weather data, enter a city name or zip code in the search bar and press enter or click the search button.


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License
[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

Distributed under the MIT License. See `LICENSE` for more information.


## Contact
**Justin (Jus) Ferrell**

- Email: [jferrell826@gmail.com](jferrell826@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/lifeofmatsu/](https://www.linkedin.com/in/lifeofmatsu/)

- Project Link: [https://github.com/lifeofmatsu/matsu-weather-forecast.git](https://github.com/lifeofmatsu/matsu-weather-forecast.git)


## Acknowledgments

- **API Handling:** [OpenWeatherMap API](https://openweathermap.org/api).
- **Application Fonts:** [Google Fonts](https://fonts.google.com).
- **Color Theme:** Inspired by [Rosé Pine](https://rosepinetheme.com/).
- **Debugging:** [ChatGPT 4](https://chat.openai.com/).
- **Toggle Switch Button:** Adapted from [UCSD Coding Bootcamp](https://git.bootcampcontent.com/University-of-California---San-Diego/UCSD-VIRT-FSF-PT-09-2023-U-LOLC/-/blob/d5e6546770e3a300de6659bbe57c3cc0da5bb293/04-Web-APIs/01-Activities/11-Ins_Event-Listener/assets/css/style.css) and [W3Schools](https://www.w3schools.com/howto/howto_css_switch.asp).
