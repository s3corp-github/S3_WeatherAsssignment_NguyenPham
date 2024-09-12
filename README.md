# Weather Application 🌦️

This project is a weather application built using **React** and **TypeScript**, following the **Feature-Sliced Design (FSD)** architecture. The app allows users to search for cities, view their current weather conditions, and filter results by temperature using live data fetched from the OpenWeather API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Used](#api-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing and Coverage](#testing-and-coverage)

## Introduction

The Weather Application provides a simple and interactive interface for users to check the current weather conditions of any city worldwide. This app uses **React** and **TypeScript** to ensure type safety and scalability, and follows the **Feature-Sliced Design (FSD)** methodology to keep the codebase modular and maintainable.

## Features

- Search weather information by city name in Russia.
- Add cities to track weather conditions, including city name, temperature, Particulate Matter 10 and wind speed.
- Filter results based on temperature slider.
- Show number of cities currently displayed out of total cities in list after temperature filtering.
- Remove City from watchlist.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better code quality.
- **Feature-Sliced Design (FSD)**: Architectural pattern for project organization.
- **CSS Modules**: Scoped and modular styles.
- **OpenWeather API**: Source for real-time weather data.

## API Used

- **API get info city**: https://api.openweathermap.org/data/2.5/weather?q=[CITY_NAME]&appid=[API_KEY]&units=metric
- **API get info air quality**: https://api.openweathermap.org/data/2.5/air_pollution?lat=[LATITUDE]&lon=[LONGITUDE]&appid=[API_KEY]

## Getting Started

Follow these steps to get a local copy of the project up and running:

### Prerequisites

- Make sure you have **Node.js** and **npm** (or **yarn**) installed on your machine.

- **Node.js**: Version 16.17.0 or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/s3corp-github/S3_WeatherAsssignment_NguyenPham.git
   ```

2. Navigate to the project directory:

   ```bash
   cd S3_WeatherAsssignment_NguyenPham
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a .env file in the root directory and add your OpenWeather API key:
   ```bash
   REACT_APP_API_KEY = your_api_key_here
   REACT_APP_BASE_URL = https://api.openweathermap.org/data/2.5/weather
   ```
5. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
6. Open your browser and visit http://localhost:3000 to view the app.

## Usage

1. Type the name of a Russian city in the search bar.
2. Choose from the suggested options or click the Search button.
3. View the current weather conditions for the city, including the city name, temperature, Particulate Matter 10, and wind speed.
4. Use the temperature slider to display cities with temperatures higher than the selected temperature.
5. Click the close button in the upper right corner of the card if you want to delete the city card.

## Testing and Coverage

This project uses Jest and React Testing Library for unit testing. We aim for high test coverage to ensure the reliability and quality of the application. Currently, the project maintains **over 80% test coverage** across all components and functions.

### Running Tests

To run the tests, use the following command:

    npm test
    # or
    yarn test

### Test Coverage Report

To generate a test coverage report, run:

    npm run test:coverage
    # or
    yarn test:coverage

The coverage report will be output to the /coverage directory. Open the index.html file in a browser to view the detailed coverage report. **You should see that the coverage is maintained at over 80%**.
![test-coverage html](https://github.com/user-attachments/assets/9fa4ab90-6965-4ba8-a2a8-d6f80af7600e)

## Screenshot UI

![ui-app](https://github.com/user-attachments/assets/18056894-e519-4481-aab0-11eff01f244e)
![suggest](https://github.com/user-attachments/assets/ea24b50b-2ad5-4903-88b4-7560875057d4)
![error](https://github.com/user-attachments/assets/5ac2b5b5-3cdf-42a1-9251-6d841db48bf5)
