import css from './ImageGalleryItem.module.css'
export const ImageGalleryItem =({link, name, id, openModal}) =>{
	return(
		<li className={css.galleryItem}>
  <img className={css.galleryItemImage} src={link} alt={name} key ={id} onClick ={()=>openModal({id, name})}/>
</li>
	)
}