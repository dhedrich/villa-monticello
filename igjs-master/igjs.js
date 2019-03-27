var request = require("request")

var formatPosts = (rawPosts, username) => {
  let result = [];
  rawPosts = JSON.parse(rawPosts)
  if (rawPosts.contents.split('window._sharedData = ')[1] == undefined) {
    console.log("UNDEFINED")
    return
  }
  rawPosts = JSON.parse(rawPosts.contents.split('window._sharedData = ')[1].split('\;\<\/script>')[0]).entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges
  rawPosts.forEach(function (item) {
    result.push({
      raw: item.node,
      image: item.node.display_url,
      dimensions: item.node.dimensions,
      likes: item.node.edge_liked_by.count,
      caption: item.node.edge_media_to_caption.edges[0].node.text,
      comments: item.node.edge_media_to_comment.count,
      video: item.node.is_video,
      code: item.node.shortcode,
      url: 'https://instagram.com/p/' + item.node.shortcode,
      timestamp: item.node.taken_at_timestamp,
      thumbnails: {
        xs: item.node.thumbnail_resources[0].src,
        sm: item.node.thumbnail_resources[1].src,
        md: item.node.thumbnail_resources[2].src,
        lg: item.node.thumbnail_resources[3].src,
        xl: item.node.thumbnail_resources[4].src
      }
    })
  })
  return result;
}

module.exports = {
  getPosts: user => {
    return new Promise((resolve, reject) => {
      const url = 'http://api.allorigins.win/get?url=' + encodeURIComponent('https://instagram.com/' + user + '/')
      request(url, function (error, response, body) {
        if (error) console.log(error)
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        resolve(formatPosts(body))
        reject(console.log("ERROR"))
      });
    });
  }
}