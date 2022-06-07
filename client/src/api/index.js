import axios from "axios";

const HOST = "https://mahon-lev.vercel.app/";

let instance = axios.create({
    baseURL:`${HOST}`,
    headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   authorization: `Bearer ${access_token}`,
    },
});

export const get = async ({ url }) => {
  try {
    const { data } = await instance.get(`${url}`);
    console.log(`GET : ${url}`, { data });
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error?.response?.data)
      console.dir(
        `ERROR GET : ${url}/ DATA : ${JSON.stringify(
          error?.response?.data
        )} / HEADER ${JSON.stringify(instance.defaults.headers.common)}`
      );
    else console.dir(error);
    return {
      success: false,
      errorMessage: "error-message",
    };
  }
};

export const post = async ({ url, body }) => {
  try {
    const { data } = await instance.post(`${url}`, body);
    console.log(`POST : ${url}`, { body, data });
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error?.response?.data)
      console.dir(
        `ERROR POST : ${url}/ DATA : ${JSON.stringify(error?.response?.data)}`
      );
    else console.dir(error);
    return {
      success: false,
      errorMessage: "error-message",
    };
  }
};

export const put = async ({ url, body }) => {
  try {
    const { data } = await instance.put(`${url}`, body);
    console.log(`PUT : ${url}`, { body, data });
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error?.response?.data)
      console.dir(
        `ERROR PUT : ${url}/ DATA : ${JSON.stringify(error?.response?.data)}`
      );
    else console.dir(error);
    return {
      success: false,
      errorMessage: "error-message",
    };
  }
};
