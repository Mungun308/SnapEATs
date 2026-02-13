import { restaurants, loadRestaurants } from './data/restaurants.js';
import {
  updatePriceDisplay,
  updateStarDisplay,
  applyAllFilters,
  getCurrentFilters,
  applyAdditionalFilters
} from './filters/engine.js';
import {
  displayRestaurantsInList,
  createRestaurantCard,
  formatReviews,
  makeCardsClickable,
  scrollRestaurants,
  showFilteredResults,
  hideFilteredResults,
  getCategoryName,
  filterRestaurantsByCategory,
  displayRestaurantsByCategory
} from './ui/restaurants.js';

window.updatePriceDisplay = updatePriceDisplay;
window.updateStarDisplay = updateStarDisplay;
window.applyAllFilters = applyAllFilters;
window.getCurrentFilters = getCurrentFilters;
window.applyAdditionalFilters = applyAdditionalFilters;
window.scrollRestaurants = scrollRestaurants;
window.hideFilteredResults = hideFilteredResults;
window.showFilteredResults = showFilteredResults;
window.displayRestaurantsByCategory = displayRestaurantsByCategory;
window.filterRestaurantsByCategory = filterRestaurantsByCategory;

let supabaseClient = null;


// DOm ajillah uyd supabase init hiih
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    
    if (typeof supabase !== 'undefined' && supabaseUrl && supabaseAnonKey) {
        try {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
            console.log('Supabase client initialized successfully');
            
            testSupabaseConnection();
        } catch (e) {
            console.error('Supabase initialization error:', e);
            supabaseClient = null;
        }
    } else {
        console.log('Supabase not available, using localStorage only');
    }
    
});


let currentUser = null;
let userLocation = null;
let cart = [];
let currentRestaurant = null;
let currentCategory = 'highranked';

//restaurantiin tsesnii jihee
const menuItems = {
    default: [
        { id: 1, name: "Signature Dish 1", description: "Тусгай хоол, шинэхэн орцтой", price: 24900, image: "./img/menu/pizza1.jpg", category: "Үндсэн" },
        { id: 2, name: "Signature Dish 2", description: "Амттан хоол, тусгай соустай", price: 18900, image: "./img/menu/naan.jpg", category: "Үндсэн" },
        { id: 3, name: "Appetizer", description: "Амт орохын өмнөх хоол", price: 12500, image: "./img/menu/salad.jpg", category: "Зууш" },
        { id: 4, name: "Drink", description: "Сэргээх ундаа", price: 4500, image: "./img/menu/spaghetti.jpg", category: "Ундаа" }
    ]
};

const categoryTitles = {
    highranked: "ӨНДӨР ҮНЭЛГЭЭТЭЙ",
    new: "ШИНЭ",
    gift: "УРАМШУУЛАЛТАЙ",
    featured: "ОНЦЛОХ"
};

//ehnii ehlelh functs
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    
    //hereglegch nevtersen essehiig shalgana
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
    
    //umnuh sagslasan baraanuudiig haij olno
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(); //delgets deerh medeelliig shinechlene
    
    //tovchluur deer darahad yu boloh
    initializeFilters(); //shuultuuriig beldene
    initializeCategoryButtons(); //category-iin tovchluur beldene
    initializeTabButtons(); //tab shiljuuleh tovchluur beldene
    
    //zahialgiin ognoog automatar tohiruulna hunungursun hugatsaand zahialga uguhuus sergiilne
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.value = today; //anhnii utga unuudur
        bookingDate.min = today;
    }
    
    //zahialgiin tsagiig automataar tohiruulna
    const bookingTime = document.getElementById('bookingTime');
    if (bookingTime) {
        bookingTime.value = '19:00'; //anhnii utga
    }
});

//nevtreh heseg
function showLogin() {
    document.getElementById('loginSection').style.display = 'block'; //block ni haruul gesen ug
    document.getElementById('signupSection').style.display = 'none'; //none ni nuuh
    document.getElementById('errorMsg').textContent = '';
}

function showSignup() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
    document.getElementById('errorMsg').textContent = '';
}
//hereglegchiig systemruu nevtruuleh
async function login() {
    const username = document.getElementById('loginInput').value.trim();
    const password = document.getElementById('passwordInput').value;
  
    if (!username || !password) {
      document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
      return;
    }
  
    try {
      let userRow = null;
  
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('users')
          .select('*')
          .eq('username', username)
          .limit(1)
          .maybeSingle();
  
        if (error) console.error('User lookup error:', error);
        if (data) userRow = data;
      }
  
      if (userRow) {
        currentUser = {
          id: userRow.id,                 
          username: userRow.username,
          email: userRow.email,
          name: userRow.name,
          loggedIn: true,
          createdAt: userRow.created_at
        };
      } else {
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
        currentUser = {
          id: userId,
          username: username,
          email: username.includes('@') ? username : username + '@snapeats.mn',
          name: username,
          loggedIn: true,
          createdAt: new Date().toISOString()
        };
  
        if (supabaseClient) {
          const userData = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            name: currentUser.name,
            created_at: currentUser.createdAt
          };
  
          const { error: insertErr } = await supabaseClient
            .from('users')
            .insert([userData]);
  
          if (insertErr) console.error('Supabase login user insert error:', insertErr);
        }
      }
  
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      showMainApp();
      showNotification('Амжилттай нэвтэрлээ!');
  
    } catch (error) {
      console.error('Login error:', error);
      document.getElementById('errorMsg').textContent = 'Нэвтрэхэд алдаа гарлаа';
    }
  }



async function signup() {
    const name = document.getElementById('signupName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;
    
    if (!name || !username || !email || !password || !password2) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    if (password !== password2) {
        document.getElementById('errorMsg').textContent = 'Нууц үг таарахгүй байна!';
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('errorMsg').textContent = 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой!';
        return;
    }
    
    try {
        //user id generate
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        //user object uusne
        currentUser = {
            id: userId,
            username: username,
            email: email,
            name: name,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
        
        // First, save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Try to save to Supabase if available
        if (supabaseClient) {
            try {
                console.log('Attempting to save user to Supabase:', currentUser);
                
                // Prepare the user data for Supabase
                const userData = {
                    id: userId,
                    username: username,
                    email: email,
                    name: name,
                    created_at: new Date().toISOString()
                };
                
                const { data, error } = await supabaseClient
                    .from('users')
                    .insert([userData])
                    .select();
                
                if (error) {
                    console.error('Supabase signup error:', error);
                    console.error('Error details:', error.message, error.details, error.hint);
                } else {
                    console.log('User saved to Supabase successfully:', data);
                }
            } catch (supabaseError) {
                console.error('Supabase connection error during signup:', supabaseError);
            }
        } else {
            console.log('Supabase client not available, saving locally only');
        }
        
        showMainApp();
        showNotification('Амжилттай бүртгүүллээ!');
        
    } catch (error) {
        console.error('Signup error:', error);
        document.getElementById('errorMsg').textContent = 'Бүртгүүлэхэд алдаа гарлаа';
    }
}



//garah functs
function logout() {
    localStorage.removeItem('currentUser'); //sanah oig tseverlene
    currentUser = null;
    hideUserMenu();
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginRequiredModal').style.display = 'flex';
    showLogin();
}
//undsen appiig haruulna
async function showMainApp() {
    document.getElementById('loginRequiredModal').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
  
    if (currentUser) {
      document.getElementById('userDisplayName').textContent = currentUser.name || currentUser.username;
    }
  
    getUserLocation();
  
    await loadRestaurants();
  
    displayRestaurantsByCategory(currentCategory);
  }

//bairshil togtooh functs
function getUserLocation() {
    const mapDisplay = document.getElementById('mapDisplay');
    //hutuch bairshil togtoogchiig demjdeg eseh
    if (navigator.geolocation) {
        mapDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">📍 Байршил тодорхойлж байна...</p>';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                console.log('User location:', userLocation);
                
                //gazriin zurag deer tanii bairshliig haruulna
                mapDisplay.innerHTML = `
                    <iframe 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng - 0.002}%2C${userLocation.lat - 0.002}%2C${userLocation.lng + 0.002}%2C${userLocation.lat + 0.002}&layer=mapnik&marker=${userLocation.lat}%2C${userLocation.lng}"
                        style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                    <p style="position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 5px; font-size: 12px;">
                        Таны байршил
                    </p>
                `;
                
                showNotification('Байршил амжилттай тодорхойлогдлоо!');
            },
            function(error) {
                console.error('Geolocation error:', error);
                //ulaanbaatar hot ruu shiljuulne
                userLocation = { lat: 47.9184, lng: 106.9177 };
                mapDisplay.innerHTML = `
                    <iframe 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8977%2C47.8984%2C106.9377%2C47.9384&layer=mapnik&marker=47.9184%2C106.9177"
                        style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                    <p style="position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 5px; font-size: 12px;">
                        Улаанбаатар 
                    </p>
                `;
            },
            //10 secunded todorhoilno
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        //hutuch bairshil togtoochgui bol ulaanbaatar-iig haruulna
        userLocation = { lat: 47.9184, lng: 106.9177 };
        mapDisplay.innerHTML = `
            <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8977%2C47.8984%2C106.9377%2C47.9384&layer=mapnik"
                style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                allowfullscreen>
            </iframe>
        `;
    }
}

//hoolnii filter idevhjuuleh functs
function initializeFilters() {
    //hoolnii turul songoh checkbox
    document.querySelectorAll('input[name="foodCategory"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            applyAllFilters();
        });
    });
    
    //uniin slider
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            updatePriceDisplay(this.value);
            applyAllFilters();
        });
    }
    
    //odnii unelgee
    document.querySelectorAll('.star[data-value]').forEach(function(star) {
        star.addEventListener('click', function() {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            updateStarDisplay(ratingValue);
            document.getElementById('ratingValue').value = ratingValue;
            applyAllFilters();
        });
    });
    
    //zainii slider
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', function() {
            document.getElementById('rangeText').textContent = this.value + 'km';
            applyAllFilters();
        });
    }
    
    //haih
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        //hereglegch bichih burt ajillana
        searchInput.addEventListener('input', function() {
            applyAllFilters();
        });
    }
    
    //angilal 
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        //songolt soligdoh burt ajillana
        categorySelect.addEventListener('change', function() {
            applyAllFilters();
        });
    }
}




//hereglegchiin darsang idevhtei bolgon delgets deer haruuldag
function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('se-btn-filter');
    
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-cat');
            
            categoryButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            currentCategory = category;
            displayRestaurantsByCategory(category);
            
            const titleElement = document.getElementById('categoryTitle');
            if (titleElement) {
                titleElement.textContent = categoryTitles[category] || "РЕСТОРАНУУД";
            }
            
            //umnuh hailtiin ilertsiig nuuna
            hideFilteredResults();
        });
    });
}
//hereglegch shuultuur ashiglasan esehiig shalgaad ashiglasan bol ur dung ni ashiglaagui bol undsen jagsaaltiig haruuldag

//buh shuultuuriin medeelliig neg bagts bolgono




//turul

//hereglegchiin songoson angilaliig shuuj delgetsend hamgiin ehnii 10 ilertsiig haruulna

//shuugdej irsen restaurantuudiig delgets deer haruulna

//restaurantiin kart

//unelgeenii toog boginosgono

//darahad hariu uildel uzuuldeg bolgono

//restaurantiin jagsaaltiig baruun zuun tiish guilgene


//shuultuur ashiglah uyd undsen nuur huudsiig nuuj zuvhun hailtiin ur dung jagsaaltaar haruulah uuregtei

//hereglegch shuultuuree arilgah uyd uyd hailtiin ur dung nuuj undsen nuur huudsiig butsaaj gargaj irne

//restaurantiin delgerengui medeelel
function showRestaurantDetail(restaurantId) {
    const restaurant = restaurants.find(function(r) { return r.id === restaurantId; });
    if (!restaurant) {
        showNotification('Ресторан олдсонгүй');
        return;
    }
    
    currentRestaurant=restaurant;
    
    //home hesgiig nuuna
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'block';
    
    // restaurantiin medeelliig shinechlene
    document.getElementById('restaurantName').textContent = restaurant.rest_name;
    document.getElementById('restaurantCategory').textContent = getCategoryName(restaurant.category);
    document.getElementById('restaurantRating').innerHTML = '<span>' + restaurant.rank + '</span><span>★</span>';
    document.getElementById('reviewCount').textContent = formatReviews(restaurant.amount_of_people_ranked);
    document.getElementById('restaurantCover').src = restaurant.cover;
    document.getElementById('restaurantLogo').src = restaurant.logo;
    document.getElementById('restaurantAddress').textContent = restaurant.address;
    document.getElementById('restaurantPhone').textContent = restaurant.phone;
    
    //ongooh tsag
    document.getElementById('openingHours').innerHTML = `
        <div class="info-item"><span>"Цагийн хуваарь"</span><span>${restaurant.schedule}</span></div>
    `;
    
    // Load features
    document.getElementById('restaurantFeatures').innerHTML = `
        <div class="info-item"><span>✓</span><span>Байршилд хооллох</span></div>
        <div class="info-item"><span>✓</span><span>Ширээ захиалах</span></div>
        ${restaurant.hasPromotion ? '<div class="info-item"><span></span><span>Урамшуулалтай</span></div>' : ''}
    `;
    
    //tses achaalna
    loadMenu(restaurant);
    
    //shine menug haruulna
    showTab('menu');
    
    //deed hesegruu avaachna
    window.scrollTo(0, 0);
}
//ugugdliin san deerh nershluudiig mongol heleer haragduulna 

//restaurantiin hoolnii tsesiig haruulna
function loadMenu(restaurant) {
    const menu = menuItems.default;
    const menuContainer = document.getElementById('menuItems');
    
    menuContainer.innerHTML = '';
    menu.forEach(function(item) {
        menuContainer.innerHTML += `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='./img/il-fiore.png'">
                <div class="menu-item-info">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-description">${item.description}</div>
                    <div class="menu-item-footer">
                        <div class="menu-item-price">₮${item.price.toLocaleString()}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">+ Нэмэх</button>
                    </div>
                </div>
            </div>
        `;
    });
}
//tabuudiig shiljih bolomj olgono
function initializeTabButtons() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
}
//filter deer songolt hiihed tohiroh aguulgiig gargaj busdiig ni nuuna 
function showTab(tabId) {
    
    document.querySelectorAll('.tab-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    document.querySelector('.tab-btn[data-tab="' + tabId + '"]').classList.add('active');
    
  
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.classList.remove('active');
    });
    document.getElementById(tabId + 'Tab').classList.add('active');
}
//ene functsiig duudahad nuur huudsiig gargaj irne
function showHome() {
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('homeSection').style.display = 'block';
    hideFilteredResults();
}
//nuur huudasrruu butsaahdaa sagsiig tseverlene
function goToHome() {
    //sagsiig tseverlene
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showHome();
}
//umnu nemsen eseh ali restaurantiin hool ve gedgiig shalgana
function addToCart(itemId) {
    if (!currentRestaurant) {
        showNotification('Эхлээд ресторан сонгоно уу');
        return;
    }
    
    const menu = menuItems.default;
    const item = menu.find(function(m) { return m.id === itemId; });
    
    if (!item) return;
    
    //sagsand bga esehiig ni shalgana
    const existingItem = cart.find(function(cartItem) {
        return cartItem.itemId === itemId && cartItem.restaurantId === currentRestaurant.id;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            restaurantId: currentRestaurant.id,
            restaurantName: currentRestaurant.rest_name,
            itemId: itemId,
            itemName: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(item.name + ' сагсанд нэмэгдлээ!');
}
//sagsabd hool nemeh hasah burt sagsand heden shirheg bgag haruuldag
function updateCartCount() {
    const totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    const cartCountEl = document.getElementById('cartCount');
    
    if (cartCountEl) {
        if (totalItems > 0) {
            cartCountEl.textContent = totalItems;
            cartCountEl.style.display = 'flex';
        } else {
            cartCountEl.style.display = 'none';
        }
    }
}
//sagsnii huuudsiig gargaj irne
function showCart() {
    if (cart.length === 0) {
        showNotification('Таны сагс хоосон байна');
        return;
    }
    
    //busad hesgiig nuuna
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    
    renderCartItems();
}
//hereglegch sagsnii huudasnii butsah tovch darah uyd ajillah buguud suuld bsn hesegruu butsaana
function hideCart() {
    document.getElementById('cartSection').style.display = 'none';
    
    if (currentRestaurant) {
        document.getElementById('restaurantSection').style.display = 'block';
    } else {
        document.getElementById('homeSection').style.display = 'block';
    }
}
//sagsan dahi hoolnii uniig tootsoolj hurgeltiin tulburiig nemj haruulna
function renderCartItems() {
    const cartItemsEl = document.getElementById('cartItems');
    let total = 0;
    
    cartItemsEl.innerHTML = '';
    
    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.itemName}</h4>
                    <p class="cart-item-restaurant">${item.restaurantName}</p>
                    <p class="cart-item-price">₮${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    ₮${itemTotal.toLocaleString()}
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });
    
    const deliveryFee = 2500;
    //delgets deerh niilber dunguudiig shinechlene
    document.getElementById('cartTotal').textContent = '₮' + total.toLocaleString();
    document.getElementById('deliveryTotal').textContent = '₮' + deliveryFee.toLocaleString();
    document.getElementById('grandTotal').textContent = '₮' + (total + deliveryFee).toLocaleString();
}
//sagsan dahi hoolnii too shirhegiig nemeh hasah uildliig udirdana
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        if (cart.length === 0) {
            hideCart();
            showHome();
        } else {
            renderCartItems();
        }
    }
}
//too shirhegees ul hamaaran sagsnaas ustgana
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cart.length === 0) {
        hideCart();
        showHome();
    } else {
        renderCartItems();
    }
}
//zahialgiin medeellee oruulsnii daraa tulbur tuluh alhamruu shiljih uureg guitsetgene
function proceedToPayment() {
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    const guestCount = document.getElementById('guestCount').value;
    
    if (!bookingDate || !bookingTime) {
        showNotification('Огноо болон цаг сонгоно уу');
        return;
    }
    
    //zahialgiin medeelliig sanah oid hadgalna
    localStorage.setItem('bookingInfo', JSON.stringify({
        date: bookingDate,
        time: bookingTime,
        guests: guestCount
    }));
    //huudsuudiig solino
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
    
    //tulburiin negtgeliig haruulna
    renderPaymentSummary();
    //delgetsiig deesh ni guilgene
    window.scrollTo(0, 0);
}
//tulbur tuluhiiin umnuh shalgah huudas
function renderPaymentSummary() {
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    const summaryEl = document.getElementById('paymentSummary');
    
    let total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    
    const deliveryFee = 2500;
    
    let itemsList = cart.map(function(item) {
        return `<li>${item.itemName} x${item.quantity} - ₮${(item.price * item.quantity).toLocaleString()}</li>`;
    }).join('');
    
    summaryEl.innerHTML = `
        <div class="summary-info">
            <h4>Захиалсан хоол:</h4>
            <ul>${itemsList}</ul>
            <p><strong>Ресторан:</strong> ${cart[0] ? cart[0].restaurantName : ''}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <hr>
            <p><strong>Хоолны дүн:</strong> ₮${total.toLocaleString()}</p>
            <p><strong>Үйлчилгээний төлбөр:</strong> ₮${deliveryFee.toLocaleString()}</p>
            <p class="grand-total"><strong>Нийт төлөх:</strong> ₮${(total + deliveryFee).toLocaleString()}</p>
        </div>
    `;
}
//tulbur guitsetgeh
function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            showNotification('Картын мэдээллийг бөглөнө үү');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 16) {
            showNotification('Картын дугаар буруу байна');
            return;
        }
    }
    
    //tulbur bolovsruulah
    showNotification('Төлбөр хүлээж байна...');
    
    //2 secundiin daraa amjillttai bolson huudasruu shiljine
    setTimeout(function() {
        showSuccess();
    }, 2000);
}
//tulbur amjilttai bolsnii daraa medeellin sand hadgalna

async function showSuccess() {
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'block';
    
    const checkInCode = generateCheckInCode();
    document.getElementById('checkInCode').textContent = checkInCode;

    const total = cart.reduce(function(sum, item) { 
        return sum + (item.price * item.quantity); 
    }, 0) + 2500;
    
    //bookinginfo avna
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    
    //zahialga object-r uusne
    const orderId = 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const order = {
        id: orderId,
        check_in_code: checkInCode,
        items: cart,
        booking_info: bookingInfo,
        restaurant_name: cart[0] ? cart[0].restaurantName : '',
        total: total,
        status: 'confirmed',
        created_at: new Date().toISOString()
    };

    //login hiigdssen bval supabased hadgalna
    let authUser = null;

    if (supabaseClient) {

const userRow = {
    id: order.user_id,                                  
    username: (currentUser?.username) || order.user_name || 'guest',
    name: order.user_name || currentUser?.name || 'Guest',
    email: currentUser?.email || null,
    created_at: new Date().toISOString()
  };
  
  const { error: userUpsertError } = await supabaseClient
    .from('users')
    .upsert([userRow], { onConflict: 'id' });
  
  if (userUpsertError) {
    console.error('User upsert failed:', userUpsertError);
    throw userUpsertError;
  }

    const { data, error } = await supabaseClient.auth.getUser();
    if (!error && data?.user) authUser = data.user;
    }

    if (authUser) {
    order.user_id = authUser.id;              
    order.user_name = order.user_name || "";  
    } else if (currentUser) {
    order.user_id = currentUser.id;
    order.user_name = currentUser.name;
    }

    console.log('Order to save:', order);

    if (supabaseClient && order.user_id) {
        try {
            console.log('Attempting to save order to Supabase...');
            
            const orderData = {
                id: order.id,
                user_id: order.user_id,
                user_name: order.user_name,
                check_in_code: order.check_in_code,
                items: JSON.stringify(order.items), //array-g json bolgono
                booking_info: JSON.stringify(order.booking_info), //object-g string
                restaurant_name: order.restaurant_name,
                total: order.total,
                status: order.status,
                created_at: order.created_at
            };
            
            console.log('Order data for Supabase:', orderData);
            
            const { data, error } = await supabaseClient
                .from('orders')
                .insert([orderData])
                .select();
            
            if (error) {
                console.error('Supabase order save error:', error);
                console.error('Error details:', error.message, error.details, error.hint);
                
                saveOrderLocally(order);
                showNotification('Захиалга амжилттай! (Офлайн горимд хадгалагдлаа)');
            } else {
                console.log('Order saved to Supabase successfully:', data);
                saveOrderLocally(order);
                showNotification('Захиалга амжилттай хадгалагдлаа!');
            }
        } catch (error) {
            console.error('Error saving to Supabase:', error);
            saveOrderLocally(order);
            showNotification('Захиалга амжилттай! (Офлайн горимд хадгалагдлаа)');
        }
    } else {
        console.log('Supabase not available or user not logged in, saving locally');
        saveOrderLocally(order);
        showNotification('Захиалга амжилттай!');
    }
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    document.getElementById('bookingDetails').innerHTML = `
        <div class="booking-info">
            <p><strong>Ресторан:</strong> ${order.restaurant_name}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <p><strong>Нийт төлбөр:</strong> ₮${order.total.toLocaleString()}</p>
        </div>
    `;
    
    window.scrollTo(0, 0);
}

async function debugSupabaseTables() {
    if (!supabaseClient) {
        console.log('Supabase client not initialized');
        return;
    }
    
    console.log('Testing Supabase tables...');
    
    try {
        // Test users table
        const { data: usersData, error: usersError } = await supabaseClient
            .from('users')
            .select('*')
            .limit(5);
        
        if (usersError) {
            console.error('Error fetching users:', usersError);
        } else {
            console.log('Users table sample:', usersData);
        }
        
        // Test orders table
        const { data: ordersData, error: ordersError } = await supabaseClient
            .from('orders')
            .select('*')
            .limit(5);
        
        if (ordersError) {
            console.error('Error fetching orders:', ordersError);
        } else {
            console.log('Orders table sample:', ordersData);
        }
        
    } catch (error) {
        console.error('Debug error:', error);
    }
}


// Helper function to save order locally
function saveOrderLocally(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

//zahialgiinn medeelliig haruulna
function displayMyOrder(){
    document.getElementById('bookingDetails').innerHTML=`
        <div class="booking-info">
            <p><strong>Ресторан:</strong> ${order.restaurant}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <p><strong>Нийт төлбөр:</strong> ₮${order.total.toLocaleString()}</p>
            <p><strong>Checkin code:</strong> ${bookingInfo.checkInCode}</p>
            }
        </div>
    `;
    window.scrollTo(0,0);
}
//batalgaajuulah code uusgene
function generateCheckInCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

//hereglegchiin menu
function showUserMenu() {
    document.getElementById('userMenuModal').style.display = 'flex';
}

function hideUserMenu() {
    document.getElementById('userMenuModal').style.display = 'none';
}


async function viewOrders() {
    hideUserMenu();
    
    try {
        let orders = [];
        
        if (supabaseClient && currentUser) {
            try {
                const { data, error } = await supabaseClient
                    .from('orders')
                    .select('*')
                    .eq('user_id', currentUser.id)
                    .order('created_at', { ascending: false });
                
                if (!error && data) {
                    orders = data;
                }
            } catch (supabaseError) {
                console.error('Supabase fetch error:', supabaseError);
            }
        }
        
        //supabase-s tatah bolomjgui bol local storage shalgana
        if (orders.length === 0) {
            orders = JSON.parse(localStorage.getItem('orders')) || [];
            if (currentUser) {
                orders = orders.filter(order => order.user_id === currentUser.id);
            }
        }
        
        if (orders.length === 0) {
            showNotification('Захиалгын түүх хоосон байна');
            return;
        }
        
        // zahialgiig modal-r haruulh
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.style.display = 'flex';
        modal.style.zIndex = '3000';
        
        let ordersHTML = orders.map(function(order) {
            const orderDate = new Date(order.created_at).toLocaleDateString('mn-MN');
            return `
                <div style="background: var(--color-white); padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid var(--color-grey);">
                    <p><strong>${order.restaurant_name || 'Ресторан'}</strong></p>
                    <p><strong>Check-in код:</strong> ${order.check_in_code}</p>
                    <p><strong>Огноо:</strong> ${orderDate}</p>
                    <p><strong>Нийт:</strong> ₮${order.total ? order.total.toLocaleString() : '0'}</p>
                    <p><strong>Төлөв:</strong> ${order.status || 'Баталгаажсан'}</p>
                </div>
            `;
        }).join('');
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px; max-height: 70vh; overflow-y: auto;">
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn" style="position: absolute; right: 15px; top: 10px;">×</button>
                <h2 style="margin-bottom: 20px; color: var(--color-orange);">Миний захиалгууд</h2>
                <div id="ordersList">
                    ${ordersHTML}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="auth-btn primary-btn" style="margin-top: 20px;">Хаах</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
    } catch (error) {
        console.error('Error fetching orders:', error);
        showNotification('Захиалга ачааллахад алдаа гарлаа');
    }
}



//fav restaurantiin medeelel harah uildel
function viewFavorites() {
    hideUserMenu();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        showNotification('Дуртай жагсаалт хоосон байна');
        return;
    }
    
    alert('Дуртай ресторанууд:\n\n' + favorites.map(function(f) {
        return f.name + ' (★' + f.rating + ')';
    }).join('\n'));
}
//restaurant huvaaltsah
function shareRestaurant() {
    if (currentRestaurant) {
        const shareText = currentRestaurant.rest_name + ' - SnapEATs';
        if (navigator.share) {
            navigator.share({
                title: shareText,
                text: 'Би энэ ресторанд хооллохоор төлөвлөж байна!',
                url: window.location.href
            });
        } else {
            showNotification('Холбоосыг хуулсан!');
        }
    }
}
//fav jagsaaltad nemj hasah uildel
function toggleFavorite() {
    if (!currentRestaurant) return;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(function(fav) { return fav.id === currentRestaurant.id; });
    
    if (index===-1) {
        favorites.push({
            id: currentRestaurant.id,
            name: currentRestaurant.rest_name,
            logo: currentRestaurant.logo,
            rating: currentRestaurant.rank
        });
        showNotification('Favourite жагсаалтад нэмэгдлээ!');
    } else {
        favorites.splice(index, 1);
        showNotification('Favourite жагсаалтаас хасагдлаа!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
//hereglegchiin uildliig batalgaajuulj medeelel uguh
function showNotification(message) {
    //huuchin medegdel ustgana
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) oldNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

//cartaar tuluh gej songohod cartiin medeelel oruulah talbaruudiig haruulj busad uyd nuuna
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
});

//cartiiin dugaar bolon huchintei hugatsaag oruulah uyd system automataar zai avch tashuu zuraas nemj baina
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
            let formatted = '';
            for (let i=0;i<value.length&&i<16;i++) {
                if (i>0&&i%4===0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            this.value = formatted;
        });
    }
    
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
});


export { restaurants };
