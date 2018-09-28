window.onload=function(){
    var firebaseRef=firebase.database().ref("places");
    firebaseRef.once('value').then(function(dataSnapshot) {
        console.log(dataSnapshot.val());
    });
}