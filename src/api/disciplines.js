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

export const getDisciplineById = (token, id, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "GET",
  };
  fetch(`/discipline?id=${id}`, opt)
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
  fetch('/discipline', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}