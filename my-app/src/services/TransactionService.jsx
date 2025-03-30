import httpRequest from "@/utils/httpRequest";
export const addTransaction = async (data) => {
  try {
    const response = await httpRequest.post("/transaction", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getTransactionById = async (id) => {
  try {
    const response = await httpRequest.get(`/transaction?transactionId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllTransactionByUserIdAndPeriod = async (
  userId,
  filterType
) => {
  try {
    const response = await httpRequest.get(
      `/transaction/filter?userId=${userId}&filterType=${filterType}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getAllTransactionsByUserIdAndFilterRange = async (
  userId,
  startDate,
  endDate
) => {
  try {
    const response = await httpRequest.get(
      `/transaction/filter-range?userId=${userId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const updateTransaction = async (id, data) => {
  try {
    const response = await httpRequest.put(`transaction/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteTransaction = async (id) => {
  try {
    const response = await httpRequest.delete(
      `/transaction?transactionId=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// budget list
export const getAllTransactionByUserIdAndBudgetId = async (
  userId,
  budgetId
) => {
  try {
    const response = await httpRequest.get(
      `/transaction/budget-list?userId=${userId}&budgetId=${budgetId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
