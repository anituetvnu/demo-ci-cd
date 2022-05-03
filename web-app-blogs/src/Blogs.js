import React, { useState, useEffect } from "react";
import {arrBlogs} from './Constant';
import {
  Link
} from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [key, setKey] = useState('earth');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://newsapi.org/v2/everything?q=${key}&from=2022-04-03&sortBy=publishedAt&apiKey=f8fbc670f1a34eb485adb31cb65d8911`)
      .then((response) => setData(response?.data?.articles || []))
      .catch(() => setData([]));
  }, [key])
  console.log(data);
  return (
    <div className="container mt-5">
      <input onChange={(e) => setKey(e.target.value || 'earth')} />

      <div className="row mt-5">
      {
        data.map((blog, index) => {
          return (
            <div className="mt-4">
              <div className="card">
                  <div class="card-body">
                    <h5 class="card-title">{`#${index + 1}`}</h5>
                    <p class="card-text">{blog.title}</p>
                    <p class="card-text">{blog.description}</p>
                  </div>

                  <img className="img" src={blog.urlToImage} />
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
