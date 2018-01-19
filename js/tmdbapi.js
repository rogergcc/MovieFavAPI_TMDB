(function() {
    function createNode(element) {
        return document.createElement(element);
    }
    function append(parent, el) {
        return parent.appendChild(el);
    }

    const ul = document.getElementById("favMovies");
    const url = `https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?
            &page=1
            &language=en-US
            &sort_by=release_date.asc
            `;
    fetch(url, {
        method: "get",
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MTYyMzE5NDcsInN1YiI6IjU4NzQyZTgzYzNhMzY4MTc0YzAxNWVkYyIsImp0aSI6IjY0MTA4NCIsImF1ZCI6IjUxNmFkZjFlMTU2NzA1OGY4ZWNiZjMwYmYyZWI5Mzc4Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInZlcnNpb24iOjF9.LJ1zRyHicf-7xQhZVGRbYmCSA26Rdt7Vvk6jsEB9rmA",
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then(resp => resp.json())
    .then(function(data) {
        let total_pages = data.total_pages;

        //console.log('f: -> ' + data.tagline)

        for (let i = 0; i <= total_pages; i++) {
            let url2 = `https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?
            &page=${i}
            &language=en-US
            &sort_by=release_date.asc`;
            fetch(url2, {
                method: "get",
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MTYyMzE5NDcsInN1YiI6IjU4NzQyZTgzYzNhMzY4MTc0YzAxNWVkYyIsImp0aSI6IjY0MTA4NCIsImF1ZCI6IjUxNmFkZjFlMTU2NzA1OGY4ZWNiZjMwYmYyZWI5Mzc4Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInZlcnNpb24iOjF9.LJ1zRyHicf-7xQhZVGRbYmCSA26Rdt7Vvk6jsEB9rmA",
                    "Content-Type": "application/json;charset=utf-8"
                }
            })
                .then(resp => resp.json())
        .then(function(data) {
                let favMovies = data.results;
                //favMovies= favMovies.sort();
                favMovies = favMovies.sort(function(a, b) {
                    let dateA = new Date(a.release_date),
                        dateB = new Date(b.release_date);
                    return dateA - dateB;
                });
                return favMovies.map(function(favMovies) {
                    let li = createNode("li"),
                        img = createNode("img"),
                        gene = createNode("div"),
                        tagline = createNode("div"),
                        span = createNode("span");
                    date = createNode("span");
                    img.src =
                        "https://image.tmdb.org/t/p/original" + favMovies.poster_path;
                    //img.title = favMovies.overview;
                    let urlv3MovieDetails = `https://api.themoviedb.org/3/movie/${
                        favMovies.id
                        }?api_key=516adf1e1567058f8ecbf30bf2eb9378&language=en-US`;
                    fetch(urlv3MovieDetails)
                        .then(resp => resp.json())
                    .then(function(data) {
                        //console.log('f: -> ' + data.tagline)

                        for (let gen of data.genres) {
                            gene.innerHTML += gen.name + ", ";
                        }
                        gene.innerHTML = gene.innerHTML.slice(0, -2);

                        tagline.innerHTML = data.tagline;
                    });

                    gene.id = "genere";
                    //div.innerHTML=favMovies.overview;
                    //div.style.display='none';
                    span.innerHTML = `${favMovies.title}`;
                    date.innerHTML = `${favMovies.release_date}`;
                    date.id="dater";
                    append(li, img);
                    append(li, gene);
                    append(li, tagline);
                    append(li, span);

                    append(li, date);
                    append(ul, li);
                });
            });
        }
    })
        .catch(function(error) {
            console.log(JSON.stringify(error));
        });
})();
