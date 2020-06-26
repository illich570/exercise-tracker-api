
const postUser =  async () => {
  const userValue = document.getElementById('username').value;
  const response = await fetch('/api/exercise/new-user',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({userValue})
  })
  const result = await response.json();
  console.log(result);
}

const postExercise = async () => {
  const userId = document.getElementById('userID').value;
  const description = document.getElementById('descrip').value;
  const duration = document.getElementById('duration').value;
  const date = document.getElementById('date').value;
  const bodyData = {
    userId,
    description,
    duration,
    date
  };
  const response = await fetch('/api/exercise/add',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(bodyData)
  });
  const result = await response.json();
  console.log(result);
}