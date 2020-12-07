import ImagesApiService from './js/apiService'
import imagesTpl from './temp/image-cards.hbs'
import LoadMoreBtn from './js/loadMore'

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
})

const imagesApiService = new ImagesApiService()


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)


function onSearch(e) {
    e.preventDefault();

    cleanImagesContainer()
    imagesApiService.query = e.currentTarget.elements.query.value
    
    if (imagesApiService.query === "") {
        return alert('Enter something')
    }

    loadMoreBtn.show()
    imagesApiService.resetPage()

     
    fetchImages()

}


function onLoadMore() {
    fetchImages()
    .then(
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.clientHeight - 100,
          behavior: 'smooth',
        });
      }, 1000),
    )
    .catch(err => console.log(err));
}

function fetchImages() {
    loadMoreBtn.disable() 
    imagesApiService.fetchImages().then(hits => {
        if (hits.length === 0) {
            loadMoreBtn.hide()
        } else {
            loadMoreBtn.enable(),
            appendImagesMarkup(hits)
        }
        
    })  
}

function appendImagesMarkup(hits) {
    refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(hits))
}

function cleanImagesContainer() {
    refs.imagesContainer.innerHTML = ''
}