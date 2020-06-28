// export const baseURL = `https://guiasapi.czarware.tech/api/guias`;
export const baseURL = `http://localhost:5000/api/guias`;
export const authURL = `http://localhost:4000/api`;
export let headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
let composedURL = baseURL;
let options = null;
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
  // if (!!options) {
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
  // } else {
  //   // let authToken = localStorage.getItem("x-auth-token");
  //   // let options = {
  //   //   method: "GET",
  //   //   mode: "cors",
  //   //   headers: {
  //   //     "Access-Control-Allow-Origin": "*",
  //   //     "Content-Type": "application/json",
  //   //     "x-auth-token": authToken,
  //   //   },
  //   // };
  //   return fetch(url, options)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.type === "Error") {
  //         throw Error(data.message);
  //       }
  //       return data;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // }
};
