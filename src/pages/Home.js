import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db,auth } from "../firebase-config";
const Home = ({isAuth}) => {
  const [articleList, setArticleList] = useState([]);
  const [updateArticleList,setUpdateArticleList] = useState(true);
  const deleteArticle = useCallback(async (id) => {
    const articleDoc = doc(db, "articles", id);
    await deleteDoc(articleDoc);
    console.log("inside deleteArticle useCallback")
    setUpdateArticleList(true);
  },[]);

  useEffect(() => {
    if (!updateArticleList){
      return;
    }
    setUpdateArticleList(false)
    const articleCollectionRef = collection(db, "articles");
    const getArticles = async () => {
      //creating a new function because we need to do this asynchronously
      const data = await getDocs(articleCollectionRef);
      setArticleList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    console.log("inside home render useEffect");
    
    getArticles();
  }, [updateArticleList]);
  //empty dependency => [] means call function only on first mount(may be on end also until app not in production)
  //https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
 
  

  return (
    <div className="homePage">
      {articleList.map((article) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{article.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && article.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deleteArticle(article.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{article.postText}</div>
            <h3>@{article.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
