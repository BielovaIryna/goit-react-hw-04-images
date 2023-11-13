import React, { Component } from 'react'
import css from './Searchbar.module.css'
import { Notify } from 'notiflix'
export class Searchbar extends Component {
  state = {
    inputValue: '',
  }
  handlerChange =(e) => {

    this.setState({ inputValue: e.target.value})
  }
handlerSubmit =(e) => {
  e.preventDefault();
  if (this.state.inputValue.trim()===""){
  Notify.failure("Please enter your reqest")
  } 
  this.props.onSubmit(this.state.inputValue)
  this.setState({ inputValue: ""})

}
  render() {
    return (
      <header className={css.searchbar}>
      <form className={css.form} onSubmit={this.handlerSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel} >Search</span>
        </button>
    
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.inputValue}
        onChange={this.handlerChange}/>
      </form>
    </header>
    )
  }
}

