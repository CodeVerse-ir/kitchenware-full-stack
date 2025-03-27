import axios from "axios";

interface AxiosFetchProps<T = unknown> {
  fetchType: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data?: T;
  token?: string | null;
}

const axiosFetch = async <T, D = unknown>({
  fetchType,
  url,
  data,
  token = null,
}: AxiosFetchProps<D>): Promise<T | null> => {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios[fetchType]<T>(`${process.env.API_URL}${url}`, {
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error in axiosFetch:", error);
    return null;
  }
};

export { axiosFetch };
