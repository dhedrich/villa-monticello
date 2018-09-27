// // get instagram posts
// $.ajax({
//     url: "/insta",
//     method: "GET",
// }).done(data => {
//     renderPosts(data)
// }).error(error => {
//     console.log("Error: posts not found")
// })

let postPromise = getPosts('hotpinksunrise')
postPromise.then(posts => console.log(posts))