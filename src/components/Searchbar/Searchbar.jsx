
import { useState } from 'react'
import css from './Searchbar.module.css'
import { Notify } from 'notiflix'
export const Searchbar = ({onSubmit})=> {
  const [inputValue, setInputValue] =useState ('')
  
  const handlerChange =(e) => {

    setInputValue(e.target.value)
  }
const handlerSubmit =(e) => {
  e.preventDefault();
  if (inputValue.trim()===""){
  Notify.failure("Please enter your reqest")
  return
  } 
  onSubmit(inputValue)
  setInputValue("")

}
  
    return (
      <header className={css.searchbar}>
      <form className={css.form} onSubmit={handlerSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel} >Search</span>
        </button>
    
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
        onChange={handlerChange}/>
      </form>
    </header>
    )
  
}

