export const baseURL = `https://guiasapi.czarware.tech/api/guias`;
export const authURL = `https://antotech.czarware.tech/api`;
export let headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
let composedURL = baseURL;
let options = null;
export const timeStamp = "T10:00:00.000Z";
export const prepareCall = async (method, identifiers, data) => {
  headers["x-auth-token"] = localStorage.getItem("x-auth-token");
  if (!!data) {
    options = {
      method: method,
      body: data,
      mode: "cors",
      headers: headers,
    };
  } else {
    options = {
      method: method,
      mode: "cors",
      headers: headers,
    };
  }

  if (!!identifiers) {
    composedURL = baseURL;
    identifiers.forEach((param) => {
      composedURL += `/${param}`;
    });
  } else {
    composedURL = baseURL;
  }
  return await makeCall(composedURL, options);
};
const makeCall = async (url, options) => {
  console.log("url, options", url, options);
  return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.type === "Error") {
        throw Error(data.message);
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
