window.onload = function () {
    var firebaseRef = firebase.database().ref("places");
    firebaseRef.once('value').then(function (dataSnapshot) {
        console.log(dataSnapshot.val());
    });
}

function delOnClick(param1) {
    var firebaseRef = firebase.database().ref(param1);
    firebaseRef.remove().then(function () {
        location.reload();
    }).catch(function (error) {
        console.log("NOPE");
    })
}

function getAddress(latitude, longitude, id) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyB_1gqNDYMyc10X_3lp5qh2iTM3DlAm4gE';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    resolve(address.formatted_address);
                    document.getElementById(id).innerHTML = address.formatted_address;
                    console.log(address.formatted_address)
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

function insertProcess(a, b, c, d, e) {
    firebase.database().ref("Process").push({
        latitude: a,
        longitude: b,
        topic: c,
        description: d,
        image: e,
        date: firebase.database.ServerValue.TIMESTAMP
    })
};

// export default{
//     insertProcess
// }