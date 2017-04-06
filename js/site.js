function locationChange() {
    var selectedValue = $('select[id=locationSelect]').val()
    fetch('./data/contact-'+selectedValue+'.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
            var location = "<p>"+ body.doorNumber+", "+ body.streetName+", "+"<br>"+ body.area+", "+"<br>"+ body.district+"</p>";
             $("#locationDetails").html(location);
        });
    $("#location").show();
     fetch('./data/menu.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          $("#menuOffline").hide();
          $("#menuOnline").show();
        });
    $("#menu").show();
}

function init() {

}

init();