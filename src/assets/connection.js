const connections = {
    ig_connection_url: "https://api.instagram.com/oauth/authorize/?client_id=2c363f93284a4eeebefa204e363fe251&redirect_uri=http://localhost:3000&response_type=token",
    ig_userInfo_url: 'https://api.instagram.com/v1/users/self/?access_token=',
    ig_userPosts_url: 'https://api.instagram.com/v1/users/self/media/recent?&access_token=',
    ig_url: "https://www.instagram.com",
    url: window.location.href
}
export default connections
