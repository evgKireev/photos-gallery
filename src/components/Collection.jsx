function Collection({
  name,
  images,
  onClickIdx,
  onClickUrl,
  photoUrl,
  photoIdx,
  index,
}) {
  return (
    <div className="collection">
      <img
        className="collection__big"
        src={photoUrl === images[photoIdx] ? images[photoIdx] : images[0]}
        alt="Item"
      />
      <div className="collection__bottom">
        {images.map((value, index) => (
          <img
            onClick={() => {
              onClickIdx(index);
              onClickUrl(value);
            }}
            key={index}
            className="collection__mini"
            src={value}
            alt="Item"
          />
        ))}
      </div>
      <h4>{name}</h4>
    </div>
  );
}

export default Collection;
