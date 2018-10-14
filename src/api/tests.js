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