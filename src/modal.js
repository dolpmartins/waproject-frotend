import React, {useState, useEffect} from 'react';

const Modal = ({show, data, onSubmit, onCancel, editData}) => {

  useEffect(() => {
    console.log(editData);
    if (editData) setFormData(editData);
  }, [editData]);

  const initialFormState = () => {
    return editData ? {id: editData.id, descricao: editData.descricao} : {id: null, descricao: ''};
  } 

  
  const [formData, setFormData] = useState(initialFormState);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: (name === 'id' ? parseInt(value) : value )});
  }

  const submitData = event => {
    event.preventDefault();
    setFormData({ ...formData});
    console.log(formData)
    onSubmit(formData);
    onCancel();
  }

  return (
    show ? (
    <div className="modal-overlay">
      <div className='modal'>
        <form onSubmit={submitData}>
          <h3>{editData ? 'Editar' : 'Novo'}</h3>
          <div className="modal-section">
            <label>Descrição</label>
            <input type="text" name="descricao" onChange={onInputChange} value={formData.descricao} />
          </div>
          <button type="button" onClick={onCancel}>cancel</button>
          <button type="submit">submit</button>
        </form>
      </div>
    </div> 
    ) : null
  );
}

export default Modal;