const loadNewsCategory = async () => {
    showLoadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const newses = data.data.news_category;
    displayNewsCategory(newses);
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
    const showNewsCategory = document.getElementById('category');
    showNewsCategory.innerText = newsCategory;
    // console.log(newsCategoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryId}`);
    const data = await res.json();
    const wholeNewses = data.data;
    displayNewsCart(wholeNewses);
}

const displayNewsCart = wholeNewses => {
    console.log(wholeNewses.length);
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
              <button onclick="getNewsDetails('${wholeNews._id}')" class="btn btn-outline">Details</button>
              <button class="btn btn-outline" onclick="my_modal_5.showModal(), getNewsDetails('${wholeNews._id}')">Details#</button>
            </div>
          </div>
        </div>
        `;
        showNewsCart.appendChild(newsCart);
    })
    showLoadingSpinner(false);
}

const showLoadingSpinner = (spinningRing) =>{
    const spinner = document.getElementById('loading-spinner');
    if(spinningRing){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}


const getNewsDetails = (newsDetails) =>{
    console.log(newsDetails);
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