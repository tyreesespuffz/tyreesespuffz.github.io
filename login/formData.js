function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
firebase.initialize({
                projectName: 'FinalP2MineNoOneElses'
            });
            var database = firebase.database();
            
            function authenticate()
            {
                event.preventDefault();
                var formData = $("form").serializeArray();
                var userName = formData[0].value;
                var password = formData[1].value;
                //Retrieve data at the node userName
                database.ref(userName).on("value", function(data){
                    //check if there is data at this node
                    if(data === null)
                    {
                        var firstName =  prompt("You're new here - What's your name?");
                        //set the value of the userName to have the value firstName
                        database.ref(userName).set({
                            firstName: firstName
                        })
                    }
                    else
                    {
                        //Welcome the user back to the homepage
                        window.location.replace("../L-homepage/homepage.html");
                    }
                });
            }