import * as React from 'react';
import './modalParameterProfile.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { BsFillPencilFill } from 'react-icons/bs';




const style = {
  position: 'relative',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#504d4d',
  border: '2px solid #000',
  borderRadius: '10px',
  p: 4,
  height: '440px',

};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <li onClick={handleOpen} className='d-flex justify-content-start align-items-center ml-2'>
        <button className='dropdown-item'>
          <BsFillPencilFill />
          Modifier les données
        </button>
      </li>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='dataProfile container-fluid '>
            <p>Les données de votre profil</p>
            <form className='container' method="POST">
              <div className='fieldName' >
                <input className='col-5' name="firstName" type="text" placeholder='Prénom' />
                <input className='col-5' name="lastName" type="text" placeholder='Nom' />
              </div>
              <div className="fieldName">
                <input className="col-12 d-flex justify-content-center" name="email" type="text" placeholder='E-mail' />
              </div>
              <div className="fieldName ">
                <input className="col-12 inputPwd" name="password" type="text" placeholder="Mot de passe" />
              </div>
              <div className="fieldName ">
                <input className="col-12 inputPwd" name="password2" type="text" placeholder="Confirmer le mot de passe" />
              </div>
              <button className='col-8 d-flex align-items-center justify-content-center' type="submit">Confirmer</button>
            </form>
          </div></Box>
      </Modal>
    </div>
  );
}
