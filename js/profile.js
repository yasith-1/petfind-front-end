// Loading FOUND POSTS
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOC READY");
    const userNameElement = document.querySelector(".user_Name_Profile");
    if (userNameElement) {
        userNameElement.textContent = localStorage.getItem("userName");
    }
    loadUserFoundPosts();
});

async function loadUserFoundPosts() {
    let userName = localStorage.getItem("userName");
    console.log(userName);

    try {
        const response = await fetch(`http://localhost:8080/api/found/loaduserpost/${userName}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const postsContainer = document.getElementById("postsContainer");
        const emptyState = document.getElementById("emptyState");

        if (!postsContainer) return;
        postsContainer.innerHTML = '';

        if (response.ok && data.status === 200 && data.data && data.data.length > 0) {
            if (emptyState) emptyState.style.display = 'none';

            data.data.forEach(post => {
                const postCard = document.createElement('div');
                postCard.innerHTML = `
<div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow mb-6 flex flex-col md:flex-row">
    
    <!-- Pet Image -->
    ${post.photoUrl ? `
    <div class="md:w-1/3 w-full h-48 md:h-auto">
        <img src="${post.photoUrl}" alt="Pet photo" class="w-full h-full object-cover">
    </div>` : ''}

    <!-- Details -->
    <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
                        ${post.petType === "Cat" ? "🐱" : "🐶"}
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 text-lg">${post.petType} - ${post.breed}</h3>
                        <p class="text-sm text-gray-500">Posted on ${post.postDate}</p>
                    </div>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">${post.status}</span>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm mb-4">
                <p><strong>Color:</strong> ${post.color}</p>
                <p><strong>Gender:</strong> ${post.gender}</p>
                <p><strong>District:</strong> ${post.district}</p>
                <p><strong>City:</strong> ${post.city}</p>
                <p class="sm:col-span-2"><strong>LandMark:</strong> ${post.landmark}</p>
                <p><strong>Finder:</strong> ${post.finderName}</p>
                <p><strong>Contact:</strong> ${post.contactNumber}</p>
            </div>

            <!-- Description -->
            <p class="text-gray-700 mb-4"><strong>Description:</strong> ${post.postDescription}</p>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3 mt-auto">
            <select class="foundStatusDropdown px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm cursor-pointer" 
            data-postid="${post.postID}">
                <option value="Active" ${post.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Success" ${post.status === 'Success' ? 'selected' : ''}>Success</option>
            </select>
            <button class="foundDeleteBtn px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm" data-postid="${post.postID}">Delete</button>
        </div>
    </div>
</div>
`;
                postsContainer.appendChild(postCard);
            });
        } else {
            if (emptyState) emptyState.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading found posts:', error);
        const emptyState = document.getElementById("emptyState");
        if (emptyState) emptyState.style.display = 'block';
    }
}

// Loading LOST POSTS
const lostPostsTab = document.getElementById("lostPostsTab");
if (lostPostsTab) {
    lostPostsTab.addEventListener("click", function () {
        loadUserLostPosts();
        console.log("LOST PostsTab clicked");
    });
}

async function loadUserLostPosts() {
    let userName = localStorage.getItem("userName");
    console.log(userName);

    try {
        const response = await fetch(`http://localhost:8080/api/lost/loaduserpost/${userName}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const postsContainer = document.getElementById("lostPostsContainer");
        const emptyState = document.getElementById("emptyState");

        if (!postsContainer) return;
        postsContainer.innerHTML = '';

        if (response.ok && data.status === 200 && data.data && data.data.length > 0) {
            if (emptyState) emptyState.style.display = 'none';
            console.log(data.data);

            data.data.forEach(post => {
                const postCard = document.createElement('div');
                postCard.innerHTML = `
<div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow mb-6 flex flex-col md:flex-row">
    
    <!-- Pet Image -->
    ${post.photoUrl ? `
    <div class="md:w-1/3 w-full h-48 md:h-auto">
        <img src="${post.photoUrl}" alt="Pet photo" class="w-full h-full object-cover">
    </div>` : ''}

    <!-- Details -->
    <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
                        ${post.petType === "Cat" ? "🐱" : "🐶"}
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900 text-lg">${post.petType} - ${post.breed}</h3>
                        <p class="text-sm text-gray-500">Posted on ${post.postDate}</p>
                    </div>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">${post.status}</span>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm mb-4">
                <p><strong>Color:</strong> ${post.color}</p>
                <p><strong>Gender:</strong> ${post.gender}</p>
                <p><strong>District:</strong> ${post.district}</p>
                <p><strong>City:</strong> ${post.city}</p>
                <p class="sm:col-span-2"><strong>Address:</strong> ${post.address}</p>
                <p><strong>Finder:</strong> ${post.finderName}</p>
                <p><strong>Contact:</strong> ${post.contactNumber}</p>
            </div>

            <!-- Description -->
            <p class="text-gray-700 mb-4"><strong>Description:</strong> ${post.postDescription}</p>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3 mt-auto">
            <select class="lostStatusDropdown px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm cursor-pointer" 
            data-postid="${post.postID}">
                <option value="Active" ${post.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Success" ${post.status === 'Success' ? 'selected' : ''}>Success</option>
            </select>
            <button class="lostDeleteBtn px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm" data-postid="${post.postID}">Delete</button>
        </div>
    </div>
</div>
`;
                postsContainer.appendChild(postCard);
            });
        } else {
            if (emptyState) emptyState.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading lost posts:', error);
        const emptyState = document.getElementById("emptyState");
        if (emptyState) emptyState.style.display = 'block';
    }
}

// DELETE FOUND POSTS
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('foundDeleteBtn')) {
        const postId = e.target.getAttribute('data-postid');
        const button = e.target;

        // Show modern confirmation popup
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This post will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            didOpen: () => {
                Swal.getConfirmButton().focus();
            }
        });

        if (result.isConfirmed) {
            // Show loading popup
            Swal.fire({
                title: 'Deleting...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            try {
                const response = await fetch(`http://localhost:8080/api/found/delete/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    );
                    const postCard = button.closest('.postCard');
                    if (postCard) postCard.remove();
                    loadUserFoundPosts(); // refresh list
                } else {
                    const errorText = await response.text();
                    Swal.fire(
                        'Error!',
                        `Failed to delete post: ${errorText}`,
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    `Failed to delete post: ${error.message}`,
                    'error'
                );
                console.error("Error deleting post:", error);
            }
        }
    }
});

// DELETE LOST POSTS
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('lostDeleteBtn')) {
        const postId = e.target.getAttribute('data-postid');
        const button = e.target;

        // Show modern confirmation popup
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This post will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            didOpen: () => {
                Swal.getConfirmButton().focus();
            }
        });

        if (result.isConfirmed) {
            // Show loading popup
            Swal.fire({
                title: 'Deleting...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            try {
                const response = await fetch(`http://localhost:8080/api/lost/delete/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    );
                    const postCard = button.closest('.postCard');
                    if (postCard) postCard.remove();
                    loadUserLostPosts(); // refresh list
                } else {
                    const errorText = await response.text();
                    Swal.fire(
                        'Error!',
                        `Failed to delete post: ${errorText}`,
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    `Failed to delete post: ${error.message}`,
                    'error'
                );
                console.error("Error deleting post:", error);
            }
        }
    }
});

// Listen for change on any status dropdown for FoundPosts
document.addEventListener('change', async function (e) {
    if (e.target.classList.contains('foundStatusDropdown')) {
        const postID = e.target.getAttribute('data-postid');
        const status = e.target.value;

        try {
            const response = await fetch("http://localhost:8080/api/found/changestatus", {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    postID: postID,
                    status: status
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Status changed ", data);
                location.reload();
            } else {
                console.error("Failed to change status", response.statusText);
            }
        } catch (error) {
            console.error("Failed to change status", error);
        }
    }
});

// Listen for change on any status dropdown for LostPosts
document.addEventListener('change', async function (e) {
    if (e.target.classList.contains('lostStatusDropdown')) {
        const postID = e.target.getAttribute('data-postid');
        const status = e.target.value;

        try {
            const response = await fetch("http://localhost:8080/api/lost/changestatus", {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    postID: postID,
                    status: status
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Status changed ", data);
                location.reload();
            } else {
                console.error("Failed to change status", response.statusText);
            }
        } catch (error) {
            console.error("Failed to change status", error);
        }
    }
});