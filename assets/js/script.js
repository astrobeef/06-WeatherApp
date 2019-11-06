var uCity = "";     //The user's search
var mNewCity = {};  //The city to be added to our list
var mCityList = []; //A list of our cities

var $cityList = $("#city-list");    //Our HTML list element
var $cityInput = $("#search-input");

//Attempt to get the user's city data, if it exists
//Returns 'cityObject', an object with data on the city's weather
function getUserCity(pCityName) {

    var iNewCity = {};

    var count = 6;


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + pCityName + "&APPID=02c4d69e089dd1f4df69f5d257d967d8&units=imperial&cnt=6";

    console.log(queryURL);

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(results){

        var iTemps = [];
        results.list.forEach(day => {
            iTemps.push(day.main.temp);
        });

        var iHums = [];
        results.list.forEach(day => {
            iHums.push(day.main.humidity);
        });

        iNewCity = {
            name : results.city.name,
            temp : iTemps,
            humidity : iHums,
            windSpeed : results.list[0].wind.speed
        }

        mNewCity = iNewCity;
        console.log(mNewCity);
    
        if (mNewCity) {
            appendCityToList(mNewCity.name);
        }
    });

}


//Run if the user's search returns NOT null
//Add a city to our list
function appendCityToList(pCityName) {
    $iNewCity = $("<li>");
    $iNewCity.attr("id", pCityName);
    $iNewCity.addClass("list-group-item");
    $iNewCity.text(pCityName);

    $cityList.append($iNewCity);
    mCityList.push(mNewCity);
    console.log(mCityList);

    setUpDisplay(pCityName);
}

//Checks if the parameter exists as a name in our list of cities.
//Returns an object: null if does not exist, the object by name if it does.
function checkIfCityExistsOnList(pCityName) {

    var iCityObject = null;

    mCityList.forEach(iCity => {
        //If the input matches a city name, then this city exists on our list already.
        if (iCity.name === pCityName) {
            iCityObject = iCity;
        }
    });

    return iCityObject;
}

//Creates the cards for the 5 day forecast
function Instantiate5DayForecastCards()
{
    for(var i = 1; i < 6; i++)
    {
        var iCard_ID = "date-" + i;
        var iTemp_ID = "temp-" + i;
        var iHum_ID = "hum-" + i;

        $card = $("<div>").addClass("card bg-primary text-white col-2 mx-2");

        $date = $("<div>").addClass("card-header").attr("id", iCard_ID).text("10/31/2019");

        $card.append($date);
        
        $body = $("<div>").addClass("card-body");

        $card.append($body);

        $temp = $("<p>").text("Temp: ");
        $temp_Span = $("<span>").attr("id", iTemp_ID).addClass("text-warning");

        $body.append($temp.append($temp_Span));
        
        $hum = $("<p>").text("Humidity: ");
        $hum_Span = $("<span>").attr("id", iHum_ID).addClass("text-warning");
        
        $body.append($hum.append($hum_Span));

        $("#forecast").append($card);
    }
}

function setUpDisplay(pCityName)
{
    if(checkIfCityExistsOnList(pCityName))
    {
        var iCityObject = checkIfCityExistsOnList(pCityName);

        $("#display-name").text(iCityObject.name);
        $("#display-temp").text(iCityObject.temp[0]);
        $("#display-hum").text(iCityObject.humidity[0]);
        $("#display-wind").text(iCityObject.windSpeed);

        for(var i = 1; i < 6; i++)
        {
            var id = "#temp-" + i;

            $(id).text(iCityObject.temp[i]);
        }

        for(var i = 1; i < 6; i++)
        {
            var id = "#hum-" + i;

            $(id).text(iCityObject.humidity[i]);
        }
    }
}

Instantiate5DayForecastCards();

//When the user submits a search, get the information for a new city and add it to our list
$("#search-submit").on("click", function (event) {
    event.preventDefault();

    uCity = $cityInput.val().trim();

    if (checkIfCityExistsOnList(uCity)) {
        console.warn("Adding a city which already exists in our list");
        return null;
    }

    getUserCity(uCity);
})


$cityList.on("click", function(event){
    setUpDisplay($(event.target).attr("id"));
})