import httpRequest from "@/utils/httpRequest";
export const getAllWallet = async (userId) => {
  try {
    const response = await httpRequest.get(`/wallet?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
