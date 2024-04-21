function slashIdLoginSuccessCallback(user) {
    // Convert the SlashID token into a Symfony cookie.
    fetch('/login/callback', {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + user._token
        }
    })
    .then(async (response) => {
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
            document.location = jsonResponse.redirect;
        }
        else {
            // @todo Improve message of error.
            alert('Login failed!');
        }
    });
}
