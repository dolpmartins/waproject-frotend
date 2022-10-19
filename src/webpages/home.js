import React, { useState, useEffect }  from 'react';
import Modal from '../modal';
const Home = () => {

const [showModal, setShowModal] = useState(false);

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [tasks, setTasks] = useState([]);
const [taskData, setTaskData] = useState(null);
const [currentData, setCurrentData] = useState(null);


const toggleModal = () => {
    setShowModal(!showModal);
}



const completeTask = task => {
    fetch(`https://localhost:5001/Task/Completed/${task.id}`, {
        method: 'PUT'
    })
    .then((response) => {
        if(!response.ok) {
            alert(`erro ao consultar a API ${response.status}`);
            throw new Error(response.status);
        }
        else return response.json();
      })
    .then(
        (result) => {
            window.location.href = '/';
        }
    )
}


const deleteTask = task => {
    fetch(`https://localhost:5001/Task?id=${task.id}`, {
        method: 'DELETE'
    })
    .then((response) => {
        if(!response.ok) {
            alert(`erro ao consultar a API ${response.status}`);
            throw new Error(response.status);
        }
        else return response.json();
      })
    .then(
        (result) => {
            window.location.href = '/';
        }
    )
}

const submitTask = task => {

    fetch('https://localhost:5001/Task/', {
        method: currentData ? 'PUT' : 'POST',
        headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then((response) => {
        if(!response.ok) {
            alert(`erro ao consultar a API ${response.status}`);
            throw new Error(response.status);
        }
        else return response.json();
      })
    .then(
        (result) => {
            window.location.href = '/';
        }
    )
}

const editTask = task => {
    setCurrentData(task);
    toggleModal();
}


useEffect(() => {
    fetch("https://localhost:5001/Task/")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setTasks(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
      
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <Modal onCancel={toggleModal} onSubmit={submitTask} show={showModal} data={taskData} editData={currentData} />
                <div className="header">
                    <button onClick={toggleModal}>Novo</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Descricao</th>
                            <th>Completo em</th>
                            <th>Completo</th>
                            <th>Completar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            
                            <tr key={task.id}>
                                <td >
                                    {task.descricao} 
                                </td>
                                <td>
                                    {task.completedDescription} 
                                </td>
                                <td>
                                    {task.completedDate} 
                                </td>
                                <td>
                                    <button onClick={() => editTask(task)}>Editar</button>
                                    <button onClick={() => deleteTask(task)}>Excluir</button>
                                    { task.completedDescription == "Não" ? <button onClick={() => completeTask(task)}>Completar</button> : null }
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Home;