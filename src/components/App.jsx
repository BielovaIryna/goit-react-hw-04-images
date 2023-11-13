import React, { Component } from 'react'
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import {Modal} from './Modal/Modal'

import { fetchPixabay } from './pixabay-api'
import { Loader } from './Loader'
import { Notify } from 'notiflix'
import css from './App.module.css'
export class App extends Component {
  state = {
    images:null,
    isLoading:false,
    error:null,
    request:"",
    page: 1,
    totalHits:null,
    isOpenModal:false,
    imageData:null,
  }
  fetchImages = async (request, page) => {
    try {
      this.setState({isLoading:true})
      const data = await fetchPixabay(request, page);
      if(this.state.images === null) {
      this.setState({images:data.hits, totalHits:data.totalHits})
      
    } else{
        this.setState(prevState =>({images:[...prevState.images, ...data.hits]}))
      }
      
     
    } catch (error) {
      this.setState({error:error.message});
    }finally{
      this.setState({isLoading:false})
    }
  }
openModal =imageData=>{
  this.setState({imageData:imageData, isOpenModal:true})
}
closeModal = () =>{
  this.setState({isOpenModal:false, imageData:null});
}
 handlerSubmit = request =>{
  this.setState({page:1, images:null, request:request});
}
 handlerLoadMore =()=>{
  this.setState(prevState => ({page:prevState.page+1}));
  
}
 componentDidUpdate(_, prevState){
  if(prevState.request!==this.state.request){
    this.fetchImages(this.state.request, this.state.page)
  }
   if(prevState.page!==this.state.page){
    this.fetchImages(this.state.request, this.state.page)
  }
 }

  render() {
    const{isLoading, error, images, totalHits, isOpenModal, imageData} = this.state
    return (
      <div className={css.App}>
       <Searchbar
        onSubmit={this.handlerSubmit}/>
        {error&& Notify.failure(`Ooops something went wrong: ${error.message}`)}
        {isLoading&&<Loader/>}
      {images !== null && 
      <>
       <ImageGallery
       images = {images}
       openModal={this.openModal}

       />
       {totalHits>12&& <Button
     click ={this.handlerLoadMore}/>}
     
     </>}
       
      {isOpenModal&&(
            <Modal
            closeModal={this.closeModal}
            imageData={imageData}/>)}
      </div>
    )
  }
}

