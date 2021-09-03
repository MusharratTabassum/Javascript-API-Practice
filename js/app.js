const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        alert('please write a book name and search');
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data));
    }

}
const displayBook = books => {

    const resultsContainer = document.getElementById('book-container');
    resultsContainer.textContent = '';

    const resultTotal = document.getElementById('result-found');
    resultTotal.textContent = '';
    const p = document.createElement('p');
    p.innerHTML = `<h3>Result found : ${books.num_found}</h3>
    `
    resultTotal.appendChild(p);

    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');

        // check if there is any undefined

        if (book.cover_i === undefined) {
            url = "images/sad-romance.jpg";
        } else {
            url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        if (book.first_publish_year === undefined) {
            pubYear = '';
        } else {
            pubYear = book.first_publish_year;
        }
        if (book.author_name === undefined) {
            authorName = '';
        } else {
            authorName = book.author_name;
        }
        div.innerHTML = `
            <div class="card h-100">
                <img height="450px" src="${url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <h4>${authorName}</h4>
                    <h5>${pubYear}</h5>
                    <h6>${book.publisher}</h6>
                </div>
            </div>`;
        resultsContainer.appendChild(div);
    })
}
