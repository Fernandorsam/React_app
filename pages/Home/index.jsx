import React, {useState,useEffect} from 'react'
import './style.css';

import {Card} from '../../components/card';

 export function Home() { // função que roda 'index' do projeto

    const [studentName,setStudentName] = useState();
    const [students,setStudents] = useState([]);
    const [user,setUser] = useState({name : '', avatar : ''})

    function handleAddStudent(){// add novo contato na qual estou chamando de estudantes
        const newStudent = {
            name : studentName ,
            time : new Date().toLocaleString('pt-br', {
                hour : '2-digit',
                minute : '2-digit',
                second : '2-digit'
            })
        };

        setStudents( prevState => [...prevState, newStudent])

    }
  
   useEffect(() => { //fazer consumo da API do gitHub


    fetch('https://api.github.com/users/Fernandorsam')
    .then(response => response.json())
    .then(data => setUser({
        name : data.name,
        avatar: data.avatar_url
    }))
   },[])

   
  return (// retorna todos elementos do DOM mostrando na tela
      <div className="container" >

        <header>
            <h1>Lista de Presença</h1>
            <div>
                <strong>{user.name}</strong>
                <img src={user.avatar} alt="foto de usuario" />
            </div>
        </header>

          
          <input
            type="text" 
            placeholder="Digite o Nome"
            onChange={e => setStudentName(e.target.value)}
          />
          <button onClick={handleAddStudent}>Salvar</button>


         {  
            students.map(student =>
                
                <Card 

                key={student.time}
                name={student.name} 
                time={student.time}
               
                />)
          
          
          }
          
          
      </div>
   
   )

   
}

