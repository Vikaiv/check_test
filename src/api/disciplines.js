import "whatwg-fetch";

export const fetchDisciplines = (token, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "GET",
  };
  fetch('/list/discipline', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}