
// Additional JS functions here
window.fbAsyncInit = function() {
	FB.init({
		appId : '162999737197673', // App ID
		channelUrl : '../channel.html', // Channel File
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml : true  // parse XFBML
	});

	// Additional init code here
	// Additional init code here
	FB.getLoginStatus(function(response) {
	    if (response.status === 'connected') {
	        // User logged into FB and authorized
	        testAPI();
	        document.getElementById('fb-logout').style.display = 'block';
	    } else if (response.status === 'not_authorized') {
	        // User logged into FB but not authorized
	        login();
	    } else {
	        // User not logged into FB
	        login();
	        document.getElementById('fb-logout').style.display = 'block';
	    }
	});
};


function login() {
	FB.login(function(response) {
		if (response.authResponse) {
			// connected
		} else {
			// cancelled
		}
	});
}

function logout() {
    FB.logout(function(response) {
        console.log('User is now logged out');
    });
}

// Load the SDK Asynchronously
(function(d) {
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/et_EE/all.js";
	ref.parentNode.insertBefore(js, ref);
}
(document));