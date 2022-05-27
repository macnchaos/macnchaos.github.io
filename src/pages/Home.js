import React, { useEffect,useState } from 'react'
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";
const Home = () => {
  const [articleList, setArticleList] = useState([]);
  const articleCollectionRef = collection(db,"articles");
  useEffect(
    ()=>{
      const getArticles = async ()=>{//creating a new function because we need to do this asynchronously
        const data = await getDocs(articleCollectionRef)
        setArticleList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
      };
      console.log("here")
      getArticles()
    }
  );
  return (
    <div className='homePage'>
      {
        articleList.map(
          (article)=>{
            return <div className="post">{article.title}</div>
          }
        )
      }
    </div>
  )
}

export default Home;