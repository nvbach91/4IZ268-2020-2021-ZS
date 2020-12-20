import axios from "axios";
import { config } from "../config";

export type AddLinkParamsType = Link & Credentials

export type Credentials = {
  path: string;
  password: string;
}

export type Link = {
  name: string;
  url: string;
}

export type LinkWithID = Link & {
    _id: string;
}

export const fetchLinks = async (credentials: Credentials) => {
  const { path, password } = credentials;
  try {
    const response = await axios.post(`${config.apiUrl}/paths/${path}`, { password });
    return response;
  } catch (e) {
    return e.response;
  }
}

export const createLink = async (params: AddLinkParamsType) => {
  try {
    const response = await axios.post(`${config.apiUrl}/links`, params);
    return response;
  } catch (e) {
    return e.response;
  }
}