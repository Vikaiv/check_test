export const fetchDisciplines = () => {
  var opt = {
      headers: {
          "content-type": "application/json",
      },
      method: "GET",
  };
  fetch('/list/disipline', opt)
}