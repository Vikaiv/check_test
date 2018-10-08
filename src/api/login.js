import "whatwg-fetch";

export const auth = (email, password, {success, error}) => {
    const opt = {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email,
            password
        })
    };
    fetch('/auth', opt)
    .then(response => response.json())
    .then(result => success({result}),
    ).catch(
        exception => error(exception),
    );       
};