let userLocation = null;

// Haversine formula: distance between two lat/lng points in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // in km
  return distance;
}

// Format distance as "1.2 км" or "850 м"
function formatDistance(km) {
  if (km < 1) {
    return Math.round(km * 1000) + " м";
  }
  return km.toFixed(1) + " км";
}

// Get user location
function getUserLocation() {
  // Try to load from localStorage first
  const saved = localStorage.getItem('userLocation');
  if (saved) {
    userLocation = JSON.parse(saved);
    console.log('Location loaded from storage:', userLocation);
    updateAllDistances();
    return;
  }

  // Otherwise request from browser
  if (!navigator.geolocation) {
    console.warn('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('Location obtained:', userLocation);
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
      updateAllDistances();
    },
    (error) => {
      console.warn('Location access denied or error:', error.message);
      // Optional: show user a small non-intrusive message
      showLocationPrompt();
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Update distances for all restaurants currently loaded
function updateAllDistances() {
  if (!userLocation || !window.allRestaurants) return;

  window.allRestaurants.forEach(rest => {
    if (rest.lat && rest.lng) {
      const distKm = calculateDistance(
        userLocation.lat, userLocation.lng,
        rest.lat, rest.lng
      );
      rest.calculatedDistance = distKm;
      rest.displayDistance = formatDistance(distKm);
    } else {
      rest.calculatedDistance = Infinity;
      rest.displayDistance = rest.distance || "? км";
    }
  });

  // Trigger re-render if filters are active
  if (typeof applyFilters === 'function') {
    applyFilters();
  }
}

// Optional: gentle prompt if user denied location
function showLocationPrompt() {
  if (document.querySelector('.location-prompt')) return;

  const prompt = document.createElement('div');
  prompt.className = 'location-prompt';
  prompt.innerHTML = `
    Байршил авахыг зөвшөөрвөл ойрхон ресторануудыг харуулна 📍
    <button onclick="this.parentElement.remove(); getUserLocation()">Зөвшөөрөх</button>
    <button onclick="this.parentElement.remove()" style="margin-left:10px;background:none;border:none;color:#999;">Үгүй</button>
  `;
  prompt.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    font-size: 14px;
    text-align: center;
    z-index: 1000;
    max-width: 90%;
  `;
  document.body.appendChild(prompt);

  setTimeout(() => {
    if (prompt.parentNode) prompt.remove();
  }, 8000);
}

window.getUserLocation = getUserLocation;
window.updateAllDistances = updateAllDistances;
window.formatDistance = formatDistance;

console.log('Trying to get location...');

console.log('Location success:', userLocation);

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(getUserLocation, 1000); 
});

window.updateAllDistances = function () {
  if (!window.userLocation || !window.allRestaurants) return;

  window.allRestaurants.forEach(rest => {
    if (!rest.lat || !rest.lng) return;

    const d = calculateDistance(
      window.userLocation.lat,
      window.userLocation.lng,
      rest.lat,
      rest.lng
    );

    rest.calculatedDistance = d;
    rest.displayDistance = `${d.toFixed(1)} км`;
  });
};