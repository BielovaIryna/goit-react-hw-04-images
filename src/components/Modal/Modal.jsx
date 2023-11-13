
import { useEffect } from 'react';
import css from './Modal.module.css'
export const Modal = ({closeModal, imageData}) => {
  useEffect(()=>{
    const closeEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }}
      window.addEventListener('keydown', closeEsc);
      document.body.style.overflow = 'hidden';
      return () =>{window.removeEventListener('keydown', closeEsc);
    document.body.style.overflow = 'auto';}
  }, [closeModal])

   const    handleOverayClick = e => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    };
  
  
    return (
      <div className={css.overlay} onClick={handleOverayClick}>
        <div className={css.modal}>
          <img src={imageData.name} alt={imageData.id} />
        </div>
      </div>
    );
  
}
