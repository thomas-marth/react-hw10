import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CatImage.module.css";

const CatImage = () => {
  const [catImageUrl, setCatImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCatImage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      if (response.data && response.data.length) {
        setCatImageUrl(response.data[0].url);
      }
    } catch (error) {
      console.log("Error fetching the cat image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Случайная картинка кошки</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <img src={catImageUrl} alt="A random cat" className={styles.image} />
      )}
      <button className={styles.button} onClick={fetchCatImage}>
        Получить новую кошку
      </button>
    </div>
  );
};

export default CatImage;
