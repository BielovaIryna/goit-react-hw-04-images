import axios from "axios";

export const fetchPixabay = async (request, page) => {

	  const {data} =  await axios.get(`https://pixabay.com/api/?q=${request}&page=${page}&key=39430012-65c739e614768df0f6dbfbbc6&image_type=photo&orientation=horizontal&per_page=12`);
	
	  return data;
}

