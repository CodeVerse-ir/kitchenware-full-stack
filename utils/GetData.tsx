import axios from "axios";
import { useEffect } from "react";

// const baseURL = "http://localhost:5000/";
const baseURL = "https://fake-json-server-in.vercel.app/api/";

interface GetDataProps {
  fetch_type: "get" | "post";
  path: string;
  setData: React.Dispatch<React.SetStateAction<[] | null>>;
}

const GetData: React.FC<GetDataProps> = ({ fetch_type, path, setData }) => {
  useEffect(() => {
    axios[fetch_type](`${baseURL}${path}`)
      .then((response) => {
        setData(response.data);
        console.log(`${baseURL}${path}`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetch_type, path, setData]);

  return null;
};

export default GetData;
