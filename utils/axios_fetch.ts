import axios from "axios";

interface AxiosFetchProps {
  fetchType: "get" | "post";
  url: string;
}

const axiosFetch = async <T>({
  fetchType,
  url,
}: AxiosFetchProps): Promise<T | null> => {
  try {
    const response = await axios[fetchType](`${process.env.API_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data in axiosFetch:", error);
    return null;
  }
};

export { axiosFetch };
