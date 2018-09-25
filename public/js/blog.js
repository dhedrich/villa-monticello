// get blog entries
$.ajax({
    url: "/scrape",
    method: "GET",
}).done(data => {
    renderBlog(data)
}).error(error => {
    console.log("Error: posts not found")
})

var renderBlog = data => {
    var payload = ''
    for (entry in data) {
        payload += 
        `
        <div class="col-md-4">
            <div class="card-content">
                <div class="card-img">
                    <img src="https://alzheimers.net${data[entry].img}"/>
                        <div class="category-container"><span><h4>${data[entry].category}</h4></span></div>
                            </div>
                    <div class="card-desc">
                        <h3>${data[entry].headline}</h3>
                        <p>${data[entry].excerpt}</p>
                        <div class="btn-container">
                            <a href="${data[entry].url}" class="btn-card" target="_blank">Read</a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        `
    }
    $('.blog-entries').empty()
    $('.blog-entries').append(payload)

}