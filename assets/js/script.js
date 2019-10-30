var uCity = "";     //The user's search
var mNewCity = {};  //The city to be added to our list
var mCityList = []; //A list of our cities

var $cityList = $("#city-list");    //Our HTML list element
var $cityInput = $("#search-input");

//Attempt to get the user's city data, if it exists
//Returns 'cityObject', an object with data on the city's weather
function getUserCity(pCityName) {
    var dummyCity = {
        name: pCityName,
        temp: 63
    }

    return dummyCity;
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
}

//Checks if the parameter exists as a name in our list of cities.
function checkIfCityExistsOnList(pCityName) {

    var iTrue = false;

    mCityList.forEach(iCity => {
        //If the input matches a city name, then this city exists on our list already.
        if (iCity.name === pCityName) {
            iTrue = true;
        }
    });

    if(iTrue)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Creates the cards for the 5 day forecast
function Instantiate5DayForecastCards()
{
    for(var i = 0; i < 5; i++)
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
        $temp_Span = $("<span>").attr("id", iTemp_ID);

        $body.append($temp.append($temp_Span));
        
        $hum = $("<p>").text("Humidity: ");
        $hum_Span = $("<span>").attr("id", iHum_ID);
        
        $body.append($hum.append($hum_Span));

        $("#forecast").append($card);
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

    mNewCity = getUserCity(uCity);

    if (mNewCity) {
        appendCityToList(mNewCity.name);
    }
})

$cityList.on("click", function(event){
    console.log($(event.target).attr("id"));
})