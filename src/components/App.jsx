
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import {Modal} from './Modal/Modal'

import { fetchPixabay } from './pixabay-api'
import { Loader } from './Loader'
import { Notify } from 'notiflix'
import css from './App.module.css'
import { useEffect, useState } from 'react'
export const App =()=> {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading]=useState (false);
const [error, setError]=useState (null);
const [request, setRequest]=useState ("");
const [page, setPage]=useState (1);
const [totalHits, setTotalHits]=useState (null)
const [isOpenModal, setIsOpenModal]=useState (false)
const [imageData, setImageData]=useState (null)
  
useEffect (()=>{
  if (!request) {
    return;
  }
  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const data = await fetchPixabay(request, page);
      if(page === 1) {
        setImages(data.hits);
        setTotalHits(data.totalHits)
      
      
    } else{
        setImages(prevState =>[...prevState, ...data.hits])
      }
      
     
    } catch (error) {
      setError(error.message);
    }finally{
      setIsLoading(false)
    }
  }
  fetchImages()
}, [page, request])
  
const openModal =imageData=>{
  setImageData(imageData)
  setIsOpenModal(true)
  
}
const closeModal = () =>{
  setIsOpenModal(false)
  setImageData(null)
  
}
 const handlerSubmit = request =>{
  setPage(1);
  setImages([]);
  setRequest(request);
  
}
 const handlerLoadMore =()=>{
  setPage(prevState => prevState+1);
  
}

    return (
      <div className={css.App}>
       <Searchbar
        onSubmit={handlerSubmit}/>

        {error&& Notify.failure(`Ooops something went wrong: ${error.message}`)}
        {isLoading&&<Loader/>}
      {images !== null && 
      <>
       <ImageGallery
       images = {images}
       openModal={openModal}

       />
       {totalHits>12&& <Button
     click ={handlerLoadMore}/>}
     
     </>}
       
      {isOpenModal&&(
            <Modal
            closeModal={closeModal}
            imageData={imageData}/>)}
      </div>
    )
  
}

