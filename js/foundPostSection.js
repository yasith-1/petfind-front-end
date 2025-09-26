document.addEventListener('DOMContentLoaded', function () {
    loadPosts();
    const userNameElement = document.querySelector(".user_Name_Profile");
    if (userNameElement) {
        userNameElement.textContent = localStorage.getItem("userName");
    }
});

// District-City mapping
const districtCities = {
    "Colombo": ["Colombo", "Dehiwala", "Moratuwa", "Nugegoda"],
    "Kandy": ["Kandy", "Peradeniya", "Gampola"]
};

const districtFilter = document.getElementById('districtFilter');
const cityFilter = document.getElementById('cityFilter');

if (districtFilter && cityFilter) {
    districtFilter.addEventListener('change', () => {
        const district = districtFilter.value;
        cityFilter.innerHTML = '<option value="">All Cities</option>';

        if (district && districtCities[district]) {
            districtCities[district].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                cityFilter.appendChild(option);
            });
        }
    });
}

// Profile dropdown
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
    });

    window.addEventListener("click", () => {
        dropdownMenu.classList.add("hidden");
    });
}

async function loadPosts() {
    try {
        const response = await fetch("http://localhost:8080/api/found/getall", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok && data.status === 200 && data.data) {
            const postsContainer = document.getElementById("postsContainer");
            if (!postsContainer) return;

            postsContainer.innerHTML = '';

            data.data.forEach(post => {
                // Limit description to 5 words
                let shortDescription = post.postDescription.split(" ").slice(0, 5).join(" ");
                if (post.postDescription.split(" ").length > 5) {
                    shortDescription += "..."; // add ellipsis if longer
                }

                // Determine status styling
                const statusClass = post.status === 'ACTIVE' ? 'bg-green-400 pulse-ring' : 'bg-blue-400';
                const statusIcon = post.petType.toLowerCase() === 'dog' ? '🐕' : '🐱';

                const postCard = document.createElement('div');
                postCard.className = 'pet-card rounded-3xl shadow-xl overflow-hidden cursor-pointer post-card';
                postCard.setAttribute('data-info', JSON.stringify(post));
                postCard.innerHTML = `
                    <div class="relative">
                        <img src="${post.photoUrl}" alt="${post.petType}" class="w-full h-56 object-cover">
                        <div class="absolute top-4 left-4">
                            <span class="tag px-3 py-1 rounded-full text-sm font-medium">${statusIcon} ${post.petType}</span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <div class="w-3 h-3 ${statusClass} rounded-full"></div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-3">
                            <h3 class="text-xl font-bold text-gray-800">${post.breed}</h3>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">${post.postDate}</span>
                        </div>
                        <p class="text-gray-600 mb-2 font-medium">${shortDescription}</p>
                        <p class="text-gray-500 text-sm mb-2">${post.color} • ${post.gender}</p>
                        <div class="flex items-center text-gray-500 text-sm mb-4">
                            <i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i>
                            ${post.city}, ${post.district}
                        </div>
                        <button class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                            <i class="fas fa-eye mr-2"></i>View Details
                        </button>
                    </div>
                `;
                postsContainer.appendChild(postCard);
            });

        } else {
            const postsContainer = document.getElementById("postsContainer");
            if (postsContainer) {
                postsContainer.innerHTML = "<p class='text-center text-gray-500 col-span-full text-xl'>No posts found.</p>";
            }
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsContainer = document.getElementById("postsContainer");
        if (postsContainer) {
            postsContainer.innerHTML = "<p class='text-center text-red-500 col-span-full text-xl'>Failed to load posts.</p>";
        }
    }
}

const filterForm = document.getElementById("filterForm");
if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Grab filter values
        const petType = document.getElementById("petTypeFilter")?.value || '';
        const status = document.getElementById("statusFilter")?.value || '';
        const district = document.getElementById("districtFilter")?.value || '';
        const city = document.getElementById("cityFilter")?.value || '';

        let filterParams = {
            petType: petType,
            status: status,
            district: district,
            city: city
        };
        console.log(filterParams);
        loadFilteredPosts(filterParams);
    });
}

async function loadFilteredPosts(filter) {
    try {
        const response = await fetch("http://localhost:8080/api/found/filterpost", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filter)
        });

        const data = await response.json();

        if (response.ok && data.status === 200) {
            const postsContainer = document.getElementById("postsContainer");
            if (!postsContainer) return;

            postsContainer.innerHTML = '';

            data.data.forEach(post => {
                // Limit description to 5 words
                let shortDescription = post.postDescription.split(" ").slice(0, 5).join(" ");
                if (post.postDescription.split(" ").length > 5) {
                    shortDescription += "...";
                }

                // Determine status styling
                const statusClass = post.status === 'ACTIVE' ? 'bg-green-400 pulse-ring' : 'bg-blue-400';
                const statusIcon = post.petType.toLowerCase() === 'dog' ? '🐕' : '🐱';

                const postCard = document.createElement('div');
                postCard.className = 'pet-card rounded-3xl shadow-xl overflow-hidden cursor-pointer post-card';
                postCard.setAttribute('data-info', JSON.stringify(post));
                postCard.innerHTML = `
                    <div class="relative">
                        <img src="${post.photoUrl}" alt="${post.petType}" class="w-full h-56 object-cover">
                        <div class="absolute top-4 left-4">
                            <span class="tag px-3 py-1 rounded-full text-sm font-medium">${statusIcon} ${post.petType}</span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <div class="w-3 h-3 ${statusClass} rounded-full"></div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-3">
                            <h3 class="text-xl font-bold text-gray-800">${post.breed}</h3>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">${post.postDate}</span>
                        </div>
                        <p class="text-gray-600 mb-2 font-medium">${shortDescription}</p>
                        <p class="text-gray-500 text-sm mb-2">${post.color} • ${post.gender}</p>
                        <div class="flex items-center text-gray-500 text-sm mb-4">
                            <i class="fas fa-map-marker-alt mr-2 text-indigo-500"></i>
                            ${post.city}, ${post.district}
                        </div>
                        <button class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
                            <i class="fas fa-eye mr-2"></i>View Details
                        </button>
                    </div>
                `;
                postsContainer.appendChild(postCard);
            });

            if (data.data.length === 0) {
                postsContainer.innerHTML = "<p class='text-center text-gray-500 col-span-full text-xl'>No pets found matching your filters.</p>";
            }
        }
    } catch (error) {
        console.error('Error loading filtered posts:', error);
        const postsContainer = document.getElementById("postsContainer");
        if (postsContainer) {
            postsContainer.innerHTML = "<p class='text-center text-red-500 col-span-full text-xl'>Failed to load filtered posts.</p>";
        }
    }
}

// Show modal when card is clicked
document.addEventListener("click", function (e) {
    if (e.target.closest('.post-card')) {
        const postCard = e.target.closest('.post-card');
        const post = JSON.parse(postCard.getAttribute('data-info'));

        const modalPhoto = document.getElementById("modalPhoto");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalTag = document.getElementById("modalTag");
        const modalLocation = document.getElementById("modalLocation");
        const modalContact = document.getElementById("modalContact");
        const modalLandmark = document.getElementById("modalLandmark");
        const modalStatus = document.getElementById("modalStatus");
        const modalUser = document.getElementById("modalUser");
        const modalDate = document.getElementById("modalDate");
        const modalExtra = document.getElementById("modalExtra");
        const contactOwner = document.getElementById("contact-owner");

        if (modalPhoto) modalPhoto.src = post.photoUrl;
        if (modalTitle) modalTitle.textContent = `${post.petType} - ${post.breed}`;
        if (modalDescription) modalDescription.textContent = post.postDescription;
        if (modalTag) modalTag.textContent = `${post.petType.toLowerCase() === 'dog' ? '🐕' : '🐱'} ${post.petType}`;

        // Update modal content with modern styling
        if (modalLocation) {
            modalLocation.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-map-marker-alt text-indigo-500 w-5"></i>
                    <span class="text-gray-600 ml-3">${post.city}, ${post.district}</span>
                </div>
            `;
        }

        if (modalContact) {
            modalContact.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-phone text-green-500 w-5"></i>
                    <span class="text-gray-600 ml-3">${post.contactNumber}</span>
                </div>
            `;
        }

        if (modalLandmark) {
            modalLandmark.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-landmark text-purple-500 w-5"></i>
                    <span class="text-gray-600 ml-3">${post.landmark}</span>
                </div>
            `;
        }

        if (modalStatus) {
            modalStatus.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-circle ${post.status === 'ACTIVE' ? 'text-green-400' : 'text-blue-400'} w-5"></i>
                    <span class="text-gray-600 ml-3 font-semibold">${post.status}</span>
                </div>
            `;
        }

        if (modalUser) {
            modalUser.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-user text-gray-400 w-5"></i>
                    <span class="text-gray-500 ml-3">${post.finderName}</span>
                </div>
            `;
        }

        if (modalDate) {
            modalDate.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-calendar-days text-gray-400 w-5"></i>
                    <span class="text-gray-500 ml-3">${post.postDate}</span>
                </div>
            `;
        }

        // Add extra info
        if (modalExtra) {
            modalExtra.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-info-circle text-blue-500 w-5"></i>
                    <span class="text-gray-600 ml-3">${post.color} • ${post.gender}</span>
                </div>
            `;
        }

        if (contactOwner) {
            contactOwner.innerHTML = `<i class="fas fa-heart mr-2"></i> <a href="tel:${post.contactNumber}">Contact Owner</a>`;
        }

        const postModal = document.getElementById("postModal");
        if (postModal) {
            postModal.classList.remove("hidden");
            document.body.style.overflow = 'hidden';
        }
    }
});

// Close modal
const closeModal = document.getElementById("closeModal");
if (closeModal) {
    closeModal.addEventListener("click", function () {
        const postModal = document.getElementById("postModal");
        if (postModal) {
            postModal.classList.add("hidden");
            document.body.style.overflow = 'auto';
        }
    });
}

const postModal = document.getElementById("postModal");
if (postModal) {
    postModal.addEventListener("click", function (e) {
        if (e.target.id === "postModal") {
            postModal.classList.add("hidden");
            document.body.style.overflow = 'auto';
        }
    });
}