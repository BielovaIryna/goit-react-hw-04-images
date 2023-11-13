import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css'
export const ImageGallery = ({images, openModal})=>{
	return (
		<ul className={css.gallery}>
{images!== null && images.map(image => {
	return(
		<ImageGalleryItem
		key ={image.id}
		id ={image.id}
		link ={image.webformatURL}
		name={image.largeImageURL}
		openModal={openModal}/>
	)})
}

</ul>
	)
}