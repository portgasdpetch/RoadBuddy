window.onload=function(){
    var firebaseRef=firebase.database().ref("places");
    firebaseRef.once('value').then(function(dataSnapshot) {
        console.log(dataSnapshot.val());
    });
}

function delOnClick(param1){
    var firebaseRef=firebase.database().ref("places/"+param1);
    firebaseRef.remove().then(function(){
        location.reload();
    }).catch(function(error){
        console.log("NOPE");
    })
}

function getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address.formatted_address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};