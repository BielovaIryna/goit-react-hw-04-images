import React, { Component } from 'react';
import css from './Modal.module.css'
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeEsc);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEsc);
    document.body.style.overflow = 'auto';
  }
  closeEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }}
    handleOverayClick = e => {
      if (e.target === e.currentTarget) {
        this.props.closeModal();
      }
    };
  
  render() {
    return (
      <div className={css.overlay} onClick={this.handleOverayClick}>
        <div className={css.modal}>
          <img src={this.props.imageData.name} alt={this.props.imageData.id} />
        </div>
      </div>
    );
  }
}
