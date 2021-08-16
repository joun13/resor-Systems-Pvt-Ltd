export const csvData = (userID, token, category) => {
  return fetch("http://localhost:4000/api/csv", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
