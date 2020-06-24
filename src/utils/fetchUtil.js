export const baseURL = `https://guiasapi.czarware.tech/api/guias`;

let composedURL = baseURL;
let options = null;
export const prepareCall = async (method, identifiers, data) => {
  if (!!data) {
    options = {
      method: method,
      body: data,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  }
  if (!!identifiers) {
    composedURL = baseURL;
    identifiers.forEach((param) => {
      composedURL += `/${param}`;
    });
  }
  return await makeCall(composedURL, options);
};
const makeCall = async (url, options) => {

  if (!!options) {
    return fetch(url, options)
      .then(response=>response.json())
      .then(data=>data)
      .catch(err=>err);
  } else {
        return fetch(url, options)
      .then(response=>response.json())
      .then(data=>data)
      .catch(err=>err)
  }
};
