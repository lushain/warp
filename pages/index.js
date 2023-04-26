import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const Token = "Bearer 1c310d8e236c867b10504b3d9ecdca7c98c85737"
  const[picSrc, setPic] = useState()
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [foodData, setFood] = useState();


  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setPic(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImageSrc(changeEvent.target.files[0])
  }
  
  async function uploadImage(event) {
    event.preventDefault();
    if (!imageSrc) return; // or similar
    const form = new FormData();
    form.append("image", imageSrc);
    
    let fdata = await fetch("https://api.logmeal.es/v2/recognition/dish", {
      method: "POST",
      headers: {'Authorization': Token},
      body: form,
    });

    console.log(fdata.json())

    // get the foodData variable from here and use conditional statements to add whatever info you want.
    // https://logmeal.es/ this is website of the API
    // Also they have this annoying ratelimit thing so each user can only input 20 requests in 1 day 
    // but when we present it, it only has to work once right? 
    // also i'm facing some issue when trying to use the foodData variable in the main html code, if 
    // if you can figure something out then do that

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Food Detector</title>
        <meta name="description" content="Get info about your food at a snap of your finger!" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Food Detector
        </h1>

        <p className={styles.description}>
          Now Every Explorer can check if the food they find is edible or perhaps another one of GOD'S tricks!!
        </p>

        <form className={styles.form} method="post" onChange={handleOnChange}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={picSrc} />

          <button onClick={uploadImage}>Scan Now!</button>
        </form>
      </main>

      <footer className={styles.footer}>
          <div className={styles.inner}>
            <p>Project By:</p>
            <p>Vyom Bhatnagar</p>
          </div>

          <div className={styles.inner} style={{"font-size":"40px"}}>
            D.P.S Vasant Kunj
          </div>
        
      </footer>
    </div>
  )
}