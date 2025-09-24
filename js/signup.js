
// $("form").on("submit" , (e) => {
//     e.preventDefault()

//     let payload = {
//         username: $(".user_Name").val(),
//         password: $(".user_Password").val()
//     };

//     $.ajax({
//         url: "http://localhost:8080/api/auth/signup/",
//         type: "POST",
//         contentType: "application/json",
//         data: JSON.stringify(payload),
//         success: function(response) {
//             console.log("Success:", response);
//             setTimeout(() => {
//                 window.location.href = "../pages/signin.html";
//             }, 1000); // delay 1s for smoother UX
//         },
//         error: function(xhr) {
//             try {
//                 let response = JSON.parse(xhr.responseText);

//                 if (xhr.status === 400) {
//                     if (response.username) {
//                         $(".username-error").removeClass("hidden").text(response.username);
//                     }
//                     if (response.password) {
//                         $(".password-error").removeClass("hidden").text(response.password);
//                     }
//                 } else {
//                     alert(response.message || "Something went wrong!");
//                 }
//             } catch (e) {
//                 alert("Could not parse server response");
//             }
//         }
//     });
// })


// function googleSignUp() {
//     window.location.href = "http://localhost:8080/oauth2/authorization/google";
// }

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        username: document.querySelector(".user_Name").value,
        password: document.querySelector(".user_Password").value
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Success:", data);
            setTimeout(() => {
                window.location.href = "../pages/signin.html";
            }, 1000); // delay 1s for smoother UX
        } else {
            const errorData = await response.json();

            if (response.status === 400) {
                if (errorData.username) {
                    document.querySelector(".username-error").classList.remove("hidden");
                    document.querySelector(".username-error").textContent = errorData.username;
                }
                if (errorData.password) {
                    document.querySelector(".password-error").classList.remove("hidden");
                    document.querySelector(".password-error").textContent = errorData.password;
                }
            } else {
                alert(errorData.message || "Something went wrong!");
            }
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to server");
    }
});

function googleSignUp() {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
}