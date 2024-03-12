const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // 1)
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards
    phoneContainer.textContent = '';

    // display show all button if there is more than 10 items
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll);
    // console.log(phones.length);
    // display only first 10 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2) create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // 3) set inner HTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4) append child
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading infinity
    toggleLoader(false);
}

// handle show detail button
const handleShowDetails = async (id) =>{
    // console.log('clicked', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    // show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoader = (isLoading) => {
    const loadingInfinity = document.getElementById('loading-infinity');
    if(isLoading){
        loadingInfinity.classList.remove('hidden');
    }
    else{
        loadingInfinity.classList.add('hidden');
    }
    
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();