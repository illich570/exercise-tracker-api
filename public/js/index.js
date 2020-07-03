const modal = document.getElementById('modal');
const buttonModal = document.getElementsByClassName('close')[0];
const dataModal = document.getElementById('modal-data');



const postUser =  async () => {
  const userValue = document.getElementById('username').value;
  const response = await fetch('/api/exercise/new-user',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({userValue})
  })
  const result = await response.json();
  console.log(result);

  if(result.error){
    dataModal.textContent = `Eror en el guardado de datos, conexión incorrecta o URL invalida, intente de nuevo`;
  }else{
    modal.classList.add('active');
  
   dataModal.textContent = `Guardado exitoso, el Id del usuario es: `;  
  }


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

  if(result.error){
    dataModal.textContent = `Eror en el guardado de datos, conexión incorrecta o URL invalida, intente de nuevo`;
  }else{
   dataModal.textContent = `Guardado exitoso,pruebe a consultar!`; 
  }
}