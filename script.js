// One beginner-friendly JavaScript file is used for all pages.

const defaultServices = [
  {
    id: 1,
    name: "Wedding Decoration",
    category: "Wedding",
    type: "Decoration",
    price: 12000,
    contact: "9876543210",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    owner: "Prime Events",
    status: "Published",
  },
  {
    id: 2,
    name: "Birthday Catering",
    category: "Birthday",
    type: "Catering",
    price: 8000,
    contact: "9123456780",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    owner: "Celebration Hub",
    status: "Published",
  },
  {
    id: 3,
    name: "Live Music Setup",
    category: "College Fest",
    type: "Entertainment",
    price: 15000,
    contact: "9012345678",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    owner: "Stage Masters",
    status: "Published",
  },
];

const defaultBookings = [];

function getStoredCompanyProfiles() {
  try {
    const savedProfiles = localStorage.getItem("eventCompanyProfiles");

    if (!savedProfiles) {
      localStorage.setItem("eventCompanyProfiles", JSON.stringify({}));
      return {};
    }

    const parsedProfiles = JSON.parse(savedProfiles);
    return parsedProfiles && typeof parsedProfiles === "object" ? parsedProfiles : {};
  } catch (error) {
    console.log("Company profile read error:", error);
    return {};
  }
}

function saveCompanyProfiles(profiles) {
  try {
    localStorage.setItem("eventCompanyProfiles", JSON.stringify(profiles));
  } catch (error) {
    console.log("Company profile save error:", error);
  }
}

function getStoredTheme() {
  try {
    return localStorage.getItem("eventTheme") || "light";
  } catch (error) {
    console.log("Theme read error:", error);
    return "light";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("eventTheme", theme);
  } catch (error) {
    console.log("Theme save error:", error);
  }
}

function applyTheme(theme) {
  const themeButton = document.getElementById("themeToggleButton");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeButton) {
      themeButton.textContent = "Switch To Light Mode";
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (themeButton) {
      themeButton.textContent = "Switch To Dark Mode";
    }
  }
}

function toggleTheme() {
  const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
  saveTheme(nextTheme);
  applyTheme(nextTheme);
}

function getStoredServices() {
  try {
    const savedServices = localStorage.getItem("eventServices");

    if (!savedServices) {
      localStorage.setItem("eventServices", JSON.stringify(defaultServices));
      return defaultServices;
    }

    const parsedServices = JSON.parse(savedServices);
    return Array.isArray(parsedServices) ? parsedServices : defaultServices;
  } catch (error) {
    console.log("Service read error:", error);
    return defaultServices;
  }
}

function saveServices(services) {
  try {
    localStorage.setItem("eventServices", JSON.stringify(services));
  } catch (error) {
    console.log("Service save error:", error);
  }
}

function getStoredBookings() {
  try {
    const savedBookings = localStorage.getItem("eventBookings");

    if (!savedBookings) {
      localStorage.setItem("eventBookings", JSON.stringify(defaultBookings));
      return defaultBookings;
    }

    const parsedBookings = JSON.parse(savedBookings);
    return Array.isArray(parsedBookings) ? parsedBookings : defaultBookings;
  } catch (error) {
    console.log("Booking read error:", error);
    return defaultBookings;
  }
}

function saveBookings(bookings) {
  try {
    localStorage.setItem("eventBookings", JSON.stringify(bookings));
  } catch (error) {
    console.log("Booking save error:", error);
  }
}

function getLoggedInUser() {
  try {
    return sessionStorage.getItem("eventConnectUser");
  } catch (error) {
    console.log("Session read error:", error);
    return null;
  }
}

function getLoggedInRole() {
  try {
    return sessionStorage.getItem("eventConnectRole");
  } catch (error) {
    console.log("Session role read error:", error);
    return null;
  }
}

function getLoggedInProfile() {
  try {
    const savedProfile = sessionStorage.getItem("eventConnectProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  } catch (error) {
    console.log("Profile read error:", error);
    return null;
  }
}

function createProfile(username, role) {
  if (role === "Event Company") {
    return {
      title: username + " Events",
      email: username.toLowerCase().replace(/\s+/g, "") + "@eventconnect.com",
      phone: "9876501234",
      location: "Hyderabad",
      specialty: "Decor, catering, and stage management",
    };
  }

  return {
    title: username,
    email: username.toLowerCase().replace(/\s+/g, "") + "@mail.com",
    phone: "9123409876",
    location: "Hyderabad",
    interest: "Birthday, wedding, and college events",
  };
}

function saveLoggedInUser(username, role) {
  try {
    sessionStorage.setItem("eventConnectUser", username);
    sessionStorage.setItem("eventConnectRole", role);
    sessionStorage.setItem(
      "eventConnectProfile",
      JSON.stringify(createProfile(username, role))
    );
  } catch (error) {
    console.log("Session save error:", error);
  }
}

function clearLoggedInUser() {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.log("Session clear error:", error);
  }
}

function protectPage() {
  const currentPage = window.location.pathname;
  const username = getLoggedInUser();

  if (
    (currentPage.includes("dashboard.html") || currentPage.includes("profile.html")) &&
    !username
  ) {
    window.location.href = "index.html";
  }
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const roleInput = document.getElementById("userRole");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");

  if (!usernameInput || !roleInput || !passwordInput || !loginError) {
    return;
  }

  const username = usernameInput.value.trim();
  const role = roleInput.value;
  const password = passwordInput.value.trim();

  loginError.textContent = "";

  if (!username || !role || !password) {
    loginError.textContent = "Username, role, and password are required.";
    return;
  }

  if (password.length < 4) {
    loginError.textContent = "Password must be at least 4 characters.";
    return;
  }

  try {
    saveLoggedInUser(username, role);
    window.location.href = "dashboard.html";
  } catch (error) {
    loginError.textContent = "Login failed. Please try again.";
    console.log("Login error:", error);
  }
}

function handleLogout() {
  clearLoggedInUser();
  window.location.href = "index.html";
}

function loadApiData() {
  const apiInfo = document.getElementById("apiInfo");

  if (!apiInfo) {
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      apiInfo.textContent = data.name + " (" + data.email + ")";
    })
    .catch(function () {
      apiInfo.textContent = "API data unavailable";
    });
}

function showUserInfo() {
  const username = getLoggedInUser();
  const role = getLoggedInRole();
  const dashboardUser = document.getElementById("dashboardUser");
  const dashboardRole = document.getElementById("dashboardRole");
  const profileUsername = document.getElementById("profileUsername");
  const profileRole = document.getElementById("profileRole");

  if (dashboardUser && username) {
    dashboardUser.textContent = username;
  }

  if (dashboardRole && role) {
    dashboardRole.textContent = role;
  }

  if (profileUsername && username) {
    profileUsername.textContent = username;
  }

  if (profileRole && role) {
    profileRole.textContent = role;
  }
}

function updateRoleInterface() {
  const role = getLoggedInRole();
  const dashboardTitle = document.getElementById("dashboardTitle");
  const dashboardDescription = document.getElementById("dashboardDescription");
  const companyPanel = document.getElementById("companyPanel");
  const customerPanel = document.getElementById("customerPanel");
  const companyPublicProfilePanel = document.getElementById("companyPublicProfilePanel");
  const servicesHeading = document.getElementById("servicesHeading");
  const profileNote = document.getElementById("profileNote");

  if (role === "Event Company") {
    if (dashboardTitle) {
      dashboardTitle.textContent = "Company Dashboard";
    }

    if (dashboardDescription) {
      dashboardDescription.textContent =
        "Add services, publish them, and view bookings for your business.";
    }

    if (servicesHeading) {
      servicesHeading.textContent = "Published Services";
    }

    if (companyPanel) {
      companyPanel.classList.remove("is-hidden");
    }

    if (customerPanel) {
      customerPanel.classList.add("is-hidden");
    }

    if (companyPublicProfilePanel) {
      companyPublicProfilePanel.classList.add("is-hidden");
    }

    if (profileNote) {
      profileNote.textContent =
        "This profile shows your event company details and booking summary.";
    }
  }

  if (role === "Customer") {
    if (dashboardTitle) {
      dashboardTitle.textContent = "Customer Dashboard";
    }

    if (dashboardDescription) {
      dashboardDescription.textContent =
        "Browse services, choose one, and track your bookings clearly.";
    }

    if (servicesHeading) {
      servicesHeading.textContent = "Services You Can Book";
    }

    if (companyPanel) {
      companyPanel.classList.add("is-hidden");
    }

    if (customerPanel) {
      customerPanel.classList.remove("is-hidden");
    }

    if (companyPublicProfilePanel) {
      companyPublicProfilePanel.classList.remove("is-hidden");
    }

    if (profileNote) {
      profileNote.textContent =
        "This profile shows your customer details and booking history summary.";
    }
  }
}

function createServiceCard(service, showBookButton, showCompanyButton) {
  const card = document.createElement("article");
  card.className = "service-card";

  let buttonHtml = "";

  if (showBookButton) {
    buttonHtml +=
      '<button type="button" class="primary-btn book-now-button" data-id="' +
      service.id +
      '">Book Now</button>';
  }

  if (showCompanyButton) {
    buttonHtml +=
      '<button type="button" class="theme-btn view-company-button" data-owner="' +
      service.owner +
      '">View Company</button>';
  }

  if (buttonHtml) {
    buttonHtml = '<div class="service-action">' + buttonHtml + "</div>";
  }

  card.innerHTML = `
    <img src="${service.image}" alt="${service.name}" />
    <div class="service-content">
      <h3>${service.name}</h3>
      <div class="service-meta">
        <span class="service-badge">${service.category}</span>
        <span class="service-badge">${service.type}</span>
        <span class="service-badge">${service.status}</span>
      </div>
      <p><strong>Price:</strong> Rs. ${service.price}</p>
      <p><strong>Contact:</strong> ${service.contact}</p>
      <p><strong>Published by:</strong> ${service.owner}</p>
      ${buttonHtml}
    </div>
  `;

  return card;
}

function displayServices() {
  const servicesContainer = document.getElementById("servicesContainer");
  const role = getLoggedInRole();
  const categoryFilter = document.getElementById("categoryFilter");

  if (!servicesContainer) {
    return;
  }

  let visibleServices = getStoredServices().filter(function (service) {
    return service.status === "Published";
  });

  if (role === "Customer" && categoryFilter && categoryFilter.value !== "All") {
    visibleServices = visibleServices.filter(function (service) {
      return service.category === categoryFilter.value;
    });
  }

  servicesContainer.innerHTML = "";

  if (visibleServices.length === 0) {
    servicesContainer.innerHTML =
      '<p class="empty-state">No services are available for the selected category.</p>';
    return;
  }

  visibleServices.forEach(function (service) {
    servicesContainer.appendChild(
      createServiceCard(service, role === "Customer", role === "Customer")
    );
  });
}

function renderCompanyServices() {
  const role = getLoggedInRole();
  const username = getLoggedInUser();
  const companyServices = document.getElementById("companyServices");
  const companyServiceCount = document.getElementById("companyServiceCount");

  if (role !== "Event Company" || !companyServices || !companyServiceCount) {
    return;
  }

  const services = getStoredServices().filter(function (service) {
    return service.owner === username;
  });

  companyServiceCount.textContent = services.length + " services";
  companyServices.innerHTML = "";

  if (services.length === 0) {
    companyServices.innerHTML =
      '<p class="empty-state">You have not added any services yet.</p>';
    return;
  }

  services.forEach(function (service) {
    companyServices.appendChild(createServiceCard(service, false, false));
  });
}

function savePublishedCompanyProfile() {
  const username = getLoggedInUser();
  const profile = getLoggedInProfile();
  const companyAbout = document.getElementById("companyAbout");
  const companyHighlights = document.getElementById("companyHighlights");
  const companyWorks = document.getElementById("companyWorks");
  const companyProfileError = document.getElementById("companyProfileError");

  if (
    !username ||
    !profile ||
    !companyAbout ||
    !companyHighlights ||
    !companyWorks ||
    !companyProfileError
  ) {
    return;
  }

  companyProfileError.textContent = "";
  companyProfileError.classList.remove("success-text");

  if (
    !companyAbout.value.trim() ||
    !companyHighlights.value.trim() ||
    !companyWorks.value.trim()
  ) {
    companyProfileError.textContent = "Please fill in all company profile fields.";
    return;
  }

  try {
    const profiles = getStoredCompanyProfiles();
    profiles[username] = {
      companyName: profile.title,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      specialty: profile.specialty,
      about: companyAbout.value.trim(),
      highlights: companyHighlights.value.trim(),
      previousWorks: companyWorks.value.trim(),
    };
    saveCompanyProfiles(profiles);
    companyProfileError.textContent = "Company profile saved successfully.";
    companyProfileError.classList.add("success-text");
  } catch (error) {
    companyProfileError.textContent = "Could not save company profile.";
    console.log("Company profile save error:", error);
  }
}

function loadCompanyProfileForm() {
  const username = getLoggedInUser();
  const profiles = getStoredCompanyProfiles();
  const companyProfile = profiles[username];
  const companyAbout = document.getElementById("companyAbout");
  const companyHighlights = document.getElementById("companyHighlights");
  const companyWorks = document.getElementById("companyWorks");

  if (!companyProfile || !companyAbout || !companyHighlights || !companyWorks) {
    return;
  }

  companyAbout.value = companyProfile.about;
  companyHighlights.value = companyProfile.highlights;
  companyWorks.value = companyProfile.previousWorks;
}

function loadServicesWithPromise() {
  const loadingMessage = document.getElementById("loadingMessage");

  if (!loadingMessage) {
    return;
  }

  loadingMessage.textContent = "Loading services...";
  loadingMessage.classList.remove("success-text");

  Promise.resolve()
    .then(function () {
      return new Promise(function (resolve) {
        setTimeout(resolve, 700);
      });
    })
    .then(function () {
      displayServices();
      loadingMessage.textContent = "Services loaded successfully.";
      loadingMessage.classList.add("success-text");
      attachBookButtons();
    })
    .catch(function () {
      loadingMessage.textContent = "Unable to load services.";
    });
}

function readServiceImage(file) {
  return new Promise(function (resolve, reject) {
    if (!file) {
      resolve(
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(new Error("Image upload failed"));
    };

    reader.readAsDataURL(file);
  });
}

async function handleServiceSubmit(event) {
  event.preventDefault();

  const serviceName = document.getElementById("serviceName");
  const serviceCategory = document.getElementById("serviceCategory");
  const serviceType = document.getElementById("serviceType");
  const servicePrice = document.getElementById("servicePrice");
  const serviceContact = document.getElementById("serviceContact");
  const serviceImage = document.getElementById("serviceImage");
  const serviceError = document.getElementById("serviceError");
  const username = getLoggedInUser();

  if (
    !serviceName ||
    !serviceCategory ||
    !serviceType ||
    !servicePrice ||
    !serviceContact ||
    !serviceImage ||
    !serviceError
  ) {
    return;
  }

  const nameValue = serviceName.value.trim();
  const categoryValue = serviceCategory.value;
  const typeValue = serviceType.value.trim();
  const priceValue = servicePrice.value.trim();
  const contactValue = serviceContact.value.trim();

  serviceError.textContent = "";
  serviceError.classList.remove("success-text");

  if (!nameValue || !categoryValue || !typeValue || !priceValue || !contactValue) {
    serviceError.textContent = "Please fill in all service fields.";
    return;
  }

  if (Number(priceValue) <= 0 || Number.isNaN(Number(priceValue))) {
    serviceError.textContent = "Price must be a valid positive number.";
    return;
  }

  if (Number.isNaN(Number(contactValue))) {
    serviceError.textContent = "Contact number should contain only numbers.";
    return;
  }

  try {
    const services = getStoredServices();
    const imageValue = await readServiceImage(serviceImage.files[0]);

    services.push({
      id: Date.now(),
      name: nameValue,
      category: categoryValue,
      type: typeValue,
      price: Number(priceValue),
      contact: contactValue,
      image: imageValue,
      owner: username,
      status: "Published",
    });

    saveServices(services);
    displayServices();
    renderCompanyServices();
    attachBookButtons();
    serviceError.textContent = "Service added successfully.";
    serviceError.classList.add("success-text");
    document.getElementById("serviceForm").reset();
  } catch (error) {
    serviceError.textContent = "Could not add the service.";
    console.log("Add service error:", error);
  }
}

function selectServiceForBooking(serviceId) {
  try {
    const services = getStoredServices();
    const selected = services.find(function (service) {
      return service.id === Number(serviceId);
    });
    const selectedService = document.getElementById("selectedService");
    const bookingCategory = document.getElementById("bookingCategory");

    if (selected && selectedService) {
      selectedService.value = selected.name;
      selectedService.dataset.serviceId = String(selected.id);
    }

    if (selected && bookingCategory) {
      bookingCategory.value = selected.category;
    }
  } catch (error) {
    console.log("Select service error:", error);
  }
}

function attachBookButtons() {
  const bookButtons = document.querySelectorAll(".book-now-button");
  const viewCompanyButtons = document.querySelectorAll(".view-company-button");

  bookButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectServiceForBooking(button.dataset.id);
    });
  });

  viewCompanyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      renderPublicCompanyProfile(button.dataset.owner);
    });
  });
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const selectedService = document.getElementById("selectedService");
  const bookingCategory = document.getElementById("bookingCategory");
  const bookingDate = document.getElementById("bookingDate");
  const guestCount = document.getElementById("guestCount");
  const bookingNote = document.getElementById("bookingNote");
  const bookingError = document.getElementById("bookingError");
  const username = getLoggedInUser();

  if (
    !selectedService ||
    !bookingCategory ||
    !bookingDate ||
    !guestCount ||
    !bookingNote ||
    !bookingError
  ) {
    return;
  }

  const serviceId = selectedService.dataset.serviceId;
  bookingError.textContent = "";
  bookingError.classList.remove("success-text");

  if (!serviceId || !selectedService.value.trim()) {
    bookingError.textContent = "Please choose a service card first.";
    return;
  }

  if (
    !bookingCategory.value ||
    !bookingDate.value ||
    !guestCount.value.trim() ||
    !bookingNote.value.trim()
  ) {
    bookingError.textContent = "Please complete all booking fields.";
    return;
  }

  if (bookingDate.value < getToday()) {
    bookingError.textContent = "Booking date cannot be in the past.";
    return;
  }

  if (Number(guestCount.value) <= 0 || Number.isNaN(Number(guestCount.value))) {
    bookingError.textContent = "Guest count must be a valid positive number.";
    return;
  }

  try {
    const services = getStoredServices();
    const selected = services.find(function (service) {
      return service.id === Number(serviceId);
    });

    if (!selected) {
      bookingError.textContent = "Selected service was not found.";
      return;
    }

    const bookings = getStoredBookings();
    bookings.push({
      id: Date.now(),
      serviceId: selected.id,
      serviceName: selected.name,
      category: bookingCategory.value,
      company: selected.owner,
      customer: username,
      date: bookingDate.value,
      guests: Number(guestCount.value),
      note: bookingNote.value.trim(),
      status: "Booked",
    });

    saveBookings(bookings);
    bookingError.textContent = "Booking saved successfully.";
    bookingError.classList.add("success-text");
    document.getElementById("bookingForm").reset();
    selectedService.dataset.serviceId = "";
    renderBookings();
  } catch (error) {
    bookingError.textContent = "Could not save the booking.";
    console.log("Booking error:", error);
  }
}

function renderBookings() {
  const role = getLoggedInRole();
  const username = getLoggedInUser();
  const bookings = getStoredBookings();
  const companyBookings = document.getElementById("companyBookings");
  const companyBookingCount = document.getElementById("companyBookingCount");
  const customerBookings = document.getElementById("customerBookings");
  const customerBookingCount = document.getElementById("customerBookingCount");
  const previousBookings = document.getElementById("previousBookings");
  const previousBookingCount = document.getElementById("previousBookingCount");
  const today = getToday();

  if (role === "Event Company" && companyBookings && companyBookingCount) {
    const ownedBookings = bookings.filter(function (booking) {
      return booking.company === username;
    });

    companyBookingCount.textContent = ownedBookings.length + " bookings";
    companyBookings.innerHTML = "";

    if (ownedBookings.length === 0) {
      companyBookings.innerHTML =
        '<p class="empty-state">No bookings yet for your services.</p>';
    } else {
      ownedBookings.forEach(function (booking) {
        const card = document.createElement("article");
        card.className = "booking-card";
        card.innerHTML = `
          <h3>${booking.serviceName}</h3>
          <p><strong>Customer:</strong> ${booking.customer}</p>
          <p><strong>Category:</strong> ${booking.category}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Note:</strong> ${booking.note}</p>
        `;
        companyBookings.appendChild(card);
      });
    }
  }

  if (
    role === "Customer" &&
    customerBookings &&
    customerBookingCount &&
    previousBookings &&
    previousBookingCount
  ) {
    const userBookings = bookings.filter(function (booking) {
      return booking.customer === username;
    });
    const upcoming = userBookings.filter(function (booking) {
      return booking.date >= today;
    });
    const previous = userBookings.filter(function (booking) {
      return booking.date < today;
    });

    customerBookingCount.textContent = upcoming.length + " bookings";
    customerBookings.innerHTML = "";

    if (upcoming.length === 0) {
      customerBookings.innerHTML =
        '<p class="empty-state">You have no upcoming bookings.</p>';
    } else {
      upcoming.forEach(function (booking) {
        const card = document.createElement("article");
        card.className = "booking-card";
        card.innerHTML = `
          <h3>${booking.serviceName}</h3>
          <p><strong>Company:</strong> ${booking.company}</p>
          <p><strong>Category:</strong> ${booking.category}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Note:</strong> ${booking.note}</p>
        `;
        customerBookings.appendChild(card);
      });
    }

    previousBookingCount.textContent = previous.length + " previous bookings";
    previousBookings.innerHTML = "";

    if (previous.length === 0) {
      previousBookings.innerHTML =
        '<p class="empty-state">No previous bookings found.</p>';
    } else {
      previous.forEach(function (booking) {
        const card = document.createElement("article");
        card.className = "booking-card";
        card.innerHTML = `
          <h3>${booking.serviceName}</h3>
          <p><strong>Company:</strong> ${booking.company}</p>
          <p><strong>Category:</strong> ${booking.category}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <span class="muted-chip">Completed event</span>
        `;
        previousBookings.appendChild(card);
      });
    }
  }
}

function renderPublicCompanyProfile(companyOwner) {
  const profileName = document.getElementById("companyPublicProfileName");
  const profileContainer = document.getElementById("companyPublicProfile");

  if (!profileName || !profileContainer) {
    return;
  }

  const profiles = getStoredCompanyProfiles();
  const publicProfile = profiles[companyOwner];
  const companyServices = getStoredServices().filter(function (service) {
    return service.owner === companyOwner;
  });

  profileName.textContent = companyOwner;

  if (!publicProfile) {
    profileContainer.innerHTML = `
      <p class="empty-state">
        This company has not published full profile details yet.
      </p>
      <div class="company-profile-grid">
        <div class="detail-card">
          <h3>Company</h3>
          <p>${companyOwner}</p>
        </div>
        <div class="detail-card">
          <h3>Published Services</h3>
          <p>${companyServices.map(function (service) { return service.name; }).join(", ") || "No services yet"}</p>
        </div>
      </div>
    `;
    return;
  }

  profileContainer.innerHTML = `
    <div class="company-profile-grid">
      <div class="detail-card">
        <h3>Company Name</h3>
        <p>${publicProfile.companyName}</p>
      </div>
      <div class="detail-card">
        <h3>Phone</h3>
        <p>${publicProfile.phone}</p>
      </div>
      <div class="detail-card">
        <h3>Email</h3>
        <p>${publicProfile.email}</p>
      </div>
      <div class="detail-card">
        <h3>Location</h3>
        <p>${publicProfile.location}</p>
      </div>
      <div class="detail-card">
        <h3>About Company</h3>
        <p>${publicProfile.about}</p>
      </div>
      <div class="detail-card">
        <h3>Services They Provide</h3>
        <p>${publicProfile.highlights}</p>
      </div>
      <div class="detail-card">
        <h3>Previous Works</h3>
        <p>${publicProfile.previousWorks}</p>
      </div>
      <div class="detail-card">
        <h3>Specialty</h3>
        <p>${publicProfile.specialty || publicProfile.highlights}</p>
      </div>
    </div>
    <div class="panel-block">
      <div class="section-heading">
        <h3>Published Services</h3>
        <p>${companyServices.length} services</p>
      </div>
      <div class="services-grid" id="companyPublicServiceGrid"></div>
    </div>
  `;

  const companyPublicServiceGrid = document.getElementById("companyPublicServiceGrid");
  companyServices.forEach(function (service) {
    companyPublicServiceGrid.appendChild(createServiceCard(service, true, false));
  });
  attachBookButtons();
}

function renderProfileDetails() {
  const role = getLoggedInRole();
  const username = getLoggedInUser();
  const bookings = getStoredBookings();
  const profile = getLoggedInProfile();
  const profileDetails = document.getElementById("profileDetails");

  if (!profileDetails || !profile) {
    return;
  }

  if (role === "Event Company") {
    const totalBookings = bookings.filter(function (booking) {
      return booking.company === username;
    }).length;

    profileDetails.innerHTML = `
      <div class="detail-card">
        <h3>Company Name</h3>
        <p>${profile.title}</p>
      </div>
      <div class="detail-card">
        <h3>Email</h3>
        <p>${profile.email}</p>
      </div>
      <div class="detail-card">
        <h3>Phone</h3>
        <p>${profile.phone}</p>
      </div>
      <div class="detail-card">
        <h3>Location</h3>
        <p>${profile.location}</p>
      </div>
      <div class="detail-card">
        <h3>Specialty</h3>
        <p>${profile.specialty}</p>
      </div>
      <div class="detail-card">
        <h3>Total Bookings</h3>
        <p>${totalBookings}</p>
      </div>
    `;
  }

  if (role === "Customer") {
    const totalBookings = bookings.filter(function (booking) {
      return booking.customer === username;
    }).length;

    profileDetails.innerHTML = `
      <div class="detail-card">
        <h3>Name</h3>
        <p>${profile.title}</p>
      </div>
      <div class="detail-card">
        <h3>Email</h3>
        <p>${profile.email}</p>
      </div>
      <div class="detail-card">
        <h3>Phone</h3>
        <p>${profile.phone}</p>
      </div>
      <div class="detail-card">
        <h3>City</h3>
        <p>${profile.location}</p>
      </div>
      <div class="detail-card">
        <h3>Interested Events</h3>
        <p>${profile.interest}</p>
      </div>
      <div class="detail-card">
        <h3>Total Bookings</h3>
        <p>${totalBookings}</p>
      </div>
    `;
  }
}

function attachEvents() {
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const serviceForm = document.getElementById("serviceForm");
  const addServiceButton = document.getElementById("addServiceButton");
  const companyProfileForm = document.getElementById("companyProfileForm");
  const saveCompanyProfileButton = document.getElementById("saveCompanyProfileButton");
  const bookingForm = document.getElementById("bookingForm");
  const bookServiceButton = document.getElementById("bookServiceButton");
  const categoryFilter = document.getElementById("categoryFilter");
  const logoutButton = document.getElementById("logoutButton");
  const themeToggleButton = document.getElementById("themeToggleButton");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  if (loginButton) {
    loginButton.addEventListener("click", function () {
      if (loginForm) {
        loginForm.requestSubmit();
      }
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener("submit", handleServiceSubmit);
  }

  if (addServiceButton) {
    addServiceButton.addEventListener("click", function () {
      if (serviceForm) {
        serviceForm.requestSubmit();
      }
    });
  }

  if (companyProfileForm) {
    companyProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      savePublishedCompanyProfile();
    });
  }

  if (saveCompanyProfileButton) {
    saveCompanyProfileButton.addEventListener("click", savePublishedCompanyProfile);
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
  }

  if (bookServiceButton) {
    bookServiceButton.addEventListener("click", function () {
      if (bookingForm) {
        bookingForm.requestSubmit();
      }
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      displayServices();
      attachBookButtons();
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }
}

function startApp() {
  applyTheme(getStoredTheme());
  protectPage();
  attachEvents();
  showUserInfo();
  updateRoleInterface();
  loadServicesWithPromise();
  loadApiData();
  loadCompanyProfileForm();
  renderCompanyServices();
  renderBookings();
  renderProfileDetails();

  if (window.location.pathname.includes("index.html") && getLoggedInUser()) {
    window.location.href = "dashboard.html";
  }
}

document.addEventListener("DOMContentLoaded", startApp);
