// get instagram posts
$.ajax({
    url: "/insta",
    method: "GET",
}).done(data => {
    renderPosts(data)
    console.log(data)
}).error(error => {
    console.log("Error: posts not found")
})

var renderPosts = data => {
    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            $(".carousel-inner").append(`<div class="carousel-item active"><img class="d-block w-100" src="${data[i].thumbnails.lg}" alt="First slide"><div class="carousel-caption d-none d-md-block"><p class="hover-caption">${data[i].caption}</p></div></div>`)
        } else {
            $(".carousel-inner").append(`<div class="carousel-item"><img class="d-block w-100" src="${data[i].thumbnails.lg}" alt="First slide"><div class="carousel-caption d-none d-md-block"><p class="hover-caption">${data[i].caption}</p></div></div>`)
        }
    }
    $("#error-message").remove()
}