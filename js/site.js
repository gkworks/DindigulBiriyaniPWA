function locationChange() {
    var selectedValue = $('select[id=locationSelect]').val()
    if (selectedValue) {
        fetch('./data/contact-' + selectedValue + '.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(body) {
                var location = "<p>" + body.doorNumber + ", " + body.streetName + ", " + "<br>" + body.area + ", " + "<br>" + body.district + "</p>";
                $("#locationDetails").html(location);
            })
            .catch(function(error) {
                $("#location").html();
            });
        testConnectivity();
    }
}

function testConnectivity() {
    var statement = 'select * from weather.forecast where woeid=2295424';
    var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
        statement;

    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                $("#menuOffline").hide();
                $("#menuOnline").show();
            } else {
                $("#menuOffline").show();
                $("#menuOnline").hide();
            }
            $("#menu").show();
            $("#location").show();
        }
    };
    request.open('GET', url);
    request.send();
}