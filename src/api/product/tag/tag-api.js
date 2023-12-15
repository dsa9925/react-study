import axios from "axios";

export const getTag = async () => {
  try {
    const 응답 = await axios.get("/api/meal/tag");
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const postTag = async () => {
  try {
    const 응답 = await axios.post("/api/meal/tag");
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const patchTag = async () => {
  try {
    const 응답 = await axios.patch("/api/meal/tag");
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const putTag = async () => {
  try {
    const 응답 = await axios.put("/api/meal/tag");
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
export const deleteTag = async () => {
  try {
    const 응답 = await axios.delete("주소");
    console.log(응답.data);
  } catch (error) {
    console.log(error);
  }
};
