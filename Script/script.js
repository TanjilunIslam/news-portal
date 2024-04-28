const loadNewsCategory = async () => {
    showLoadingSpinner(true);
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        const newses = data.data.news_category;
        displayNewsCategory(newses);

    }
    catch(error){
        console.log(error);
    }
}


// const displayNewsCategory = newses => {
//     const newsCategoryContainer = document.getElementById('news-thumbnail');
//     newses.forEach(news => {
//         console.log(news);
//         const newsTitle = document.createElement('li');
//         // newsTitle.classList.add('categoryNews');
//         newsTitle.classList = 'categoryNews onClickCss p-3 rounded-full font-semibold';
//         newsTitle.innerText = `${news.category_name}`;
//         // newsTitle.classList = `flex justify-around`;
//         // newsCategoryContainer.innerHTML = `
//         // <li>${news.category_name}</li>
//         // `;
//         newsCategoryContainer.appendChild(newsTitle);
//     });
// }

const displayNewsCategory = (newses) => {
    showLoadingSpinner(false);
    const newsCategoryContainer = document.getElementById('thumbnail');
    newses.forEach(news => {
        // console.log(news);
        const newsTitle = document.createElement('div');
        newsTitle.classList = 'me-2 categoryNews py-2 rounded-full font-semibold text-center';
        newsTitle.innerHTML = `<p onclick="handleShowNewsDetail('${news.category_id}', '${news.category_name}')">${news.category_name}</p>`;
        newsCategoryContainer.appendChild(newsTitle);
    })
}

const handleShowNewsDetail = async (newsCategoryId, newsCategory) => {
    showLoadingSpinner(true);
    const showNewsCategory = document.getElementById('category');
    showNewsCategory.innerText = newsCategory;
    // console.log(newsCategoryId);
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryId}`);
        const data = await res.json();
        const wholeNewses = data.data;
        displayNewsCart(wholeNewses);
    }
    catch(error){
        console.log(error);
    }
}

const displayNewsCart = wholeNewses => {
    // console.log(wholeNewses.length);
    const newsCount = document.getElementById('news-counts');
    newsCount.innerText = wholeNewses.length;
    const showNewsCart = document.getElementById('News-cart');
    showNewsCart.innerHTML = ``;
    wholeNewses.forEach(wholeNews => {
        console.log(wholeNews);
        const newsCart = document.createElement('div');
        newsCart.classList = `mx-auto mt-10 card md:card-side lg:card-side bg-base-100 shadow-xl`;
        newsCart.innerHTML = `
        <div class=" lg:w-6/12 sm:w-full"><figure><img src="${wholeNews.image_url}" alt="Album"/></figure></div>
        <div class="card-body">
          <h2 class="card-title">${wholeNews.title}</h2>
          <p>${wholeNews.details.slice(0, 200) + '...'}</p>
          <div class="flex justify-around items-center font-medium">
            <div class="flex justify-around items-center w-4/12">
                <img class="rounded-full w-2/12" src="${wholeNews.author.img}" alt="Album"/>
                <p class=" ms-3">${wholeNews.author.name}</p>
            </div>
            <p><span>${wholeNews.total_view}</span>m</p>
            <p>${wholeNews.rating.number}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-outline" onclick="my_modal_5.showModal(), getNewsDetails('${wholeNews._id}')">Details</button>
            </div>
            </div>
            </div>
            `;
        showNewsCart.appendChild(newsCart);
    })
    showLoadingSpinner(false);
}

// {<button onclick="getNewsDetails('${wholeNews._id}')" class="btn btn-outline">Details</button>}

const showLoadingSpinner = (spinningRing) => {
    const spinner = document.getElementById('loading-spinner');
    if (spinningRing) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}


const getNewsDetails = async (newsDetails) => {
    console.log(newsDetails);
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsDetails}`);
        const data = await res.json();
        const displayNewses = data.data[0];
        displayModalNewsDetails(displayNewses);
    }
    catch(error){

    }

}

const displayModalNewsDetails = displayNewses => {
    console.log(displayNewses);
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = '';
    const authorName = displayNewses.author.name || 'not found';
    console.log(authorName);
    const modalBoxDiv = document.createElement('div');
    modalBoxDiv.innerHTML = `
    <div>
    <div><img class=" mx-auto rounded-full w-24" src="${displayNewses.author.img}" alt=""></div>
    <div class=" mt-3 text-center font-semibold">
        <p>Name : ${authorName}</p>
        <p>Date :${displayNewses.author.published_date}</p>
        <p>Title:${displayNewses.title}</p>
    </div>
    <div class="text-center">
    <p>rating : ${displayNewses.rating.number}</p>
    <p>total view :${displayNewses.total_view}m</p>
    </div>
    </div>
    `;

    modalBox.appendChild(modalBoxDiv);
}

// const displayNewsCategory = newses => {
//     const newsCategoryContainer = document.getElementById('news-thumbnail');
//     newses.forEach(news => {
//         console.log(news);
//         /* fff */
//         const newsTitle = document.createElement('li');
//         /* fff */
//         // newsTitle.classList.add('categoryNews');
//         /* fff */
//         newsTitle.classList = 'categoryNews p-3 rounded-full font-semibold';
//         newsTitle.innerText = `${news.category_name}`;
//         // /* fff */
//         // newsTitle.classList = `flex justify-around`;
//         // newsCategoryContainer.innerHTML = `
//         // <li>${news.category_name}</li>
//         // `;

//         // newsCategoryContainer.innerHTML =`<li class="categoryNews p-3 rounded-full font-semibold">${news.category_name}</li>`;
//         /* fff */
//         newsCategoryContainer.appendChild(newsTitle);
//         /* fff */
//     });
// }

handleShowNewsDetail('03', 'International News');
loadNewsCategory();