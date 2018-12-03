import "whatwg-fetch";

export const fetchTestsByDisciplineId = (token, disciplineId, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "POST",
      body: JSON.stringify({
        "discipline" : disciplineId
      })
  };
  fetch('/tests', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}

export const addTest = (token, data, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "POST",
      body: data,
  };
  fetch('/tests', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}

export const deleteTest = (token, data, {success, error}) => {
  var opt = {
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer ' + token
      },
      method: "DELETE",
      body: data,
  };
  fetch('/tests', opt)
  .then(response => response.json())
  .then(result => success({result}))
  .catch(
    exception => error(exception),
  );
}