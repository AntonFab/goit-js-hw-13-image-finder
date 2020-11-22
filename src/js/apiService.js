

// function fetchPics() {
//     return fetch(`${BASE_URL}?key=${KEY}&q=cat&image_type=photo`).then(r => {
//         return r.json()
//     })
// }

// export default { fetchPics }

// fetch(`${BASE_URL}?key=${KEY}&q=cat&image_type=photo&per_page=5&page=1`)
//     .then(r => r.json())
//     .then(console.log)


// function fetchImages(searchQuery) {
//     return fetch(`${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&per_page=5&page=1`)
//         .then(r => {
//        return r.json()
//     })
// }

// export default { fetchImages }

const KEY = '19210605-838c966ad7f74fc6aaaa61c1a'
const BASE_URL = 'https://pixabay.com/api/'
        
export default class ImagesApiService{
    constructor() {
        this.searchQuery = ''
        this.page = 1
    }
    fetchImages() {
        const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&per_page=4&page=${this.page}`
        console.log(this)

        return fetch(url)
            .then(response => response.json())
            .then(({hits}) => {
            this.incrementPage()
            return hits
        })
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}