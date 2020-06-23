export let baseURL = `https://guiasapi.czarware.tech/api/guias`;
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
  // console.log("fetch(" + url, options + ")", options);
  let response;
  if (!!options) {
    console.log(url, options);
    response = await fetch(url, options);
  } else {
    response = await fetch(url);
  }
  const data = await response.json();
  return data;
};
