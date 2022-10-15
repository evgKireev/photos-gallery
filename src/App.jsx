import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from './redux/categoriesSlice';
import { setInputValue } from './redux/categoriesSlice';
import { setIsLoading } from './redux/isLoading';
import { setIdxPhoto, setUrlPhoto } from './redux/photoSlice';
import { setPogination } from './redux/categoriesSlice';
import ReactPaginate from 'react-paginate';

import Collection from './components/Collection';

function App() {
  const categories = ['Все', 'Море', 'Горы', 'Архитектура', 'Города'];

  const [photo, setPhoto] = useState([]);
  const categoria = useSelector((state) => state.categoriesSlice.valueCategori);
  const searchValue = useSelector((state) => state.categoriesSlice.inputValue);
  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const photoUrl = useSelector((state) => state.photoSlice.photoUrl);
  const photoIdx = useSelector((state) => state.photoSlice.photoIdx);
  const pogination = useSelector((state) => state.categoriesSlice.pogination);

  const dispatch = useDispatch();

  const categoriaUrl = categoria > 0 ? `category=${categoria}` : '';
  const searchUrl = searchValue ? `search=${searchValue}` : '';
  const page = `page=${pogination}&limit=6`;
  useEffect(() => {
    async function getPhoto() {
      const { data } = await axios.get(
        `https://6349c47a5df9528514072766.mockapi.io/photo?${categoriaUrl}&${searchUrl}&${page}`
      );
      setPhoto(data);
      dispatch(setIsLoading(false));
    }
    getPhoto();
  }, [categoriaUrl, searchUrl, page, dispatch]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((value, index) => (
            <li
              onClick={() => dispatch(setActiveCategory(index))}
              className={categoria === index ? 'active' : ''}
              key={index}
            >
              {value}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => dispatch(setInputValue(e.target.value))}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет Загрузка...</h2>
        ) : (
          photo.map((value, index) => (
            <Collection
              key={index}
              name={value.name}
              index={index}
              images={value.photos}
              photoUrl={photoUrl}
              photoIdx={photoIdx}
              onClickIdx={(idx) => dispatch(setIdxPhoto(idx))}
              onClickUrl={(url) => dispatch(setUrlPhoto(url))}
            />
          ))
        )}
      </div>
      <>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(setPogination(e.selected + 1))}
          pageRangeDisplayed={3}
          pageCount={2}
          previousLabel="<"
        />
      </>
    </div>
  );
}

export default App;
