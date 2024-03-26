import axios from "axios";

const COMPILER_API = "";

export async function compileAndRun(language, code) {
  try {
    const response = await axios.post(`${COMPILER_API}/run`, {
      lang: language,
      code,
    });

    if (response.data.error) {
      return { error: response.data.error };
    } else {
      return { output: response.data.output };
    }
  } catch (error) {
    return { error: error.message };
  }
}
