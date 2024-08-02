export const PostWithAuth = (url, body) => {

    var request = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(body),
    })

    return request
}

export const PutWithAuth = (url, body) => {

    var request = fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify(body),
    })

    return request
}

export const GetWithAuth = (url) => {

    var request = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
    })

    return request
}