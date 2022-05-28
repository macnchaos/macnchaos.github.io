import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db,auth } from "../firebase-config";
const Home = ({isAuth}) => {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const articleCollectionRef = collection(db, "articles");
    const getArticles = async () => {
      //creating a new function because we need to do this asynchronously
      const data = await getDocs(articleCollectionRef);
      setArticleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    console.log("here");
    
    getArticles();
  }, []);
  //empty dependency => [] means call function only on first mount(may be on end also until app not in production)

 
  

  return (
    <div className="homePage">
      {articleList.map((article) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{article.title}</h1>
              </div>
            </div>
            <div className="postTextContainer">{article.postText}</div>
            <h3>{article.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
