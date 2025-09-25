let accessToken = localStorage.getItem("accessToken");

document.addEventListener('DOMContentLoaded', function () {
    checkAndRefreshToken();
});

async function checkAndRefreshToken() {
    if (accessToken != null) {
        try {
            const response = await fetch("http://localhost:8080/api/auth/validate-token", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Token is valid ✅", data);
            } else {
                const errorData = await response.json().catch(() => null);
                console.error("Token check failed ❌", errorData);
                console.log("VALIDATE TOKEN CALLED");
                await generateNewAccessToken();
            }
        } catch (error) {
            console.error("Token validation error:", error);
            console.log("VALIDATE TOKEN CALLED");
            await generateNewAccessToken();
        }
    } else {
        window.location.href = "../pages/signin.html";
    }
}

async function generateNewAccessToken() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            console.error("No refresh token found");
            window.location.href = "../pages/signin.html";
            return;
        }

        const response = await fetch("http://localhost:8080/api/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });

        if (response.ok) {
            const data = await response.json();

            if (data.status == 200) {
                console.log("New Access Token:", data.data);
                localStorage.setItem("accessToken", data.data); // overwrite old access token
                window.location.reload();
            } else {
                console.error("Refresh failed - invalid response status:", data);
                // Redirect to login if refresh fails
                window.location.href = "../pages/signin.html";
            }
        } else {
            const errorData = await response.json().catch(() => null);
            console.error("Refresh failed:", errorData);
            // Redirect to login if refresh fails
            window.location.href = "../pages/signin.html";
        }
    } catch (error) {
        console.error("Refresh token error:", error);
        // Redirect to login if there's a network error
        window.location.href = "../pages/signin.html";
    }
}