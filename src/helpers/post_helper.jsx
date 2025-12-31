  const { default: globals } = require("../globals")


const post_method = (url, data, callback) => {
    fetch(url, {

        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + globals.getToken()
        },
        body: JSON.stringify(data)
        
      })
      .then((response)=>response.json())
      .then((response)=>{
        callback(response)
      })
      .catch((error)=>{console.error(error)})
}

module.exports = {post_method}