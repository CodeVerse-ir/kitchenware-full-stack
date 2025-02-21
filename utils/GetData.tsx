"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";

// const baseURL = "http://localhost:5000/";
const baseURL = "https://fake-json-server-in.vercel.app/api/";

interface Product {
  code: string;
  image: string[];
  discountPercent: number;
  productName: string;
  price: string;
  discount: number;
  star: number;
  clock: string;
}

interface GetDataProps {
  setData: Dispatch<SetStateAction<Product[] | null>>;
  path: string;
}

const GetData: React.FC<GetDataProps> = ({ setData, path }) => {
  useEffect(() => {
    axios
      .get(`${baseURL}${path}`)
      .then((response) => {
        setData(response.data);
        console.log(`${baseURL}${path}`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setData, path]);

  return null;
};

export default GetData;
