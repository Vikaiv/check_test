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

export const addDiscipline = (token, data, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "POST",
      body: data,
  };
  fetch('/discipline', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}

export const deleteDiscipline = (token, data, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "DELETE",
      body: data,
  };
  console.log("data", data);
  fetch('/discipline', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}