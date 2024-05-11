import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { requestProductsByQuery } from "../../services/api";
import { ImageData } from "./App.types";


function App() {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [totalImageOnApi, setTotalImageOnApi] = useState<number>(0);
  const [isLoad, setisLoad] = useState<boolean>(false);
  const IMAGE_PER_PAGE = 12;
  const [searchImage, setSearchImage] = useState<string>("");
  const [imagesData, setimagesData] = useState<ImageData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  
  const fetchData = async (searchImage: string, currentPage: number): Promise<void> => {
    if (searchImage) {
      try {
        setisError(false);
        setisLoad(true);
        const data:any = await requestProductsByQuery(searchImage as string, IMAGE_PER_PAGE as number, currentPage as number);
        setimagesData((previmagesData:ImageData[]) => [...previmagesData, ...data.results]); 
        setTotalImageOnApi(data.total as number);
      } catch (error) {
        setisError(true);
      } finally {
        setisLoad(false);
      }
    }
  };
  
  useEffect(() => {
    if (searchImage) {
      fetchData(searchImage, currentPage);
    }
  }, [searchImage, currentPage]);

  const onSubmit = (eventValue: string) => {
    if (eventValue !== searchImage) {
      setSearchImage(eventValue);
      setCurrentPage(1);
      setimagesData([]); 
    }
};
  const onClickOnImage = (imageUrl: string): void => {
    if (!modalIsOpen) {
      setSelectedImageUrl(imageUrl);
      setModalIsOpen(true);
    }  
  };
  

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  const onClickLoadMore = (): void => {
    setCurrentPage(prevPage => prevPage + 1); 
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {imagesData.length>0 && <ImageGallery Images={imagesData} onClickOnImage={onClickOnImage} />}
      {modalIsOpen && <ImageModal imageUrl={selectedImageUrl} modalIsOpen={modalIsOpen} onRequestClose={closeModal} />}
      {isLoad && <Loader />}
      {isError && <ErrorMessage />}
      {(currentPage * IMAGE_PER_PAGE < totalImageOnApi) && <LoadMoreBtn onClickLoadMore={onClickLoadMore} />}
    </>
  );
}

export default App;