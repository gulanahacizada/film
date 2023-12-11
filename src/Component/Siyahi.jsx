import React, { createElement, useEffect, useState } from 'react';
import Backet from './Backet';
import './Siyahi.css'
import { createSlice } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';

function Siyahi() {
  const [result, setResult] = useState([]);
  const [find, setFind] = useState("");
  const [find1, setFind1] = useState("");
  const searchData = (e) => {
    setFind(e.target.value.toLowerCase())
    let leftm = document.querySelector(".leftm")
    leftm.style.display = "none"
    if(e.target.value.trim()==""){
      leftm.style.display = "inline"
    }
  }



  const [home, setHome] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=Marvel&apikey=7fdca6e`);
        const data = await response.json();
        setHome([...data.Search]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData1();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${find}&apikey=7fdca6e`);
      const data = await response.json();
      setResult(data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (find) {
      fetchData();
    }
  }, [find]);
  let ul = document.querySelector(".ul")


  const [Addedfilms, setAddedFilms] = useState([])
  const [Name, setName] = useState([])
  function handle(e) {
    setAddedFilms([...Addedfilms].filter(item => {
      return item !== e.target.parentElement.children[0].innerText;
    }))
  }
  function handle2(e) {
    setName([...Name].filter(item => {
      return item !== e.target.value;
    }))
  }
  const name = (e) => {
    const filmTitle = e.target.previousElementSibling.innerText;
    if (Addedfilms.includes(filmTitle)) {

      alert("This film is already in the basket");
    } else {
      setAddedFilms([...Addedfilms, filmTitle])
    }
  }

  const all = () => {
    let li = document.querySelector(".ul")
    let bn = document.querySelector(".bn")
    let add = document.querySelectorAll(".add")
    bn.value = ""
    setAddedFilms([])
    add.forEach((e) => {
      e.style.display = "inline"
    })

  }
  const example = () => {
    let backet = document.querySelector(".backet")
    let bn = document.querySelector(".bn")
    let a = bn.value.trim()
    if (Name.includes(a)) {
      alert("You can't give the same basket name!")
      bn.value = ""
    } else {
      setName([...Name, a])
      if (a !== "") {
        let list = document.querySelector(".list")
        let h2 = document.createElement("h2")
        let h22 = document.createElement("h1")
        list.style.display = "block"
        h2.innerText = bn.value
        h22.innerText = "-----------------"
        h22.style.color = "teal"
        list.append(h2)
        list.append(h22)
        for (let i = 0; i < ul.children.length; i++) {
          let p = document.createElement("p")
          p.innerText = ul.children[i].innerText
          list.append(p)
          backet.style.display = "none"
        }
      } else {
        alert("Fill in the bucket name!")
      }
    }
  }

  const save = () => {
    let btn = document.querySelectorAll(".delete")
    let add = document.querySelectorAll(".add")
    let backet = document.querySelector(".backet")
    let ul = document.querySelector(".ul")
    let li = document.querySelector(".mom")
    let bn = document.querySelector(".bn")
    let a = bn.value.trim()
    if (a !== "") {
      if (ul.children.length == 0) {
        alert("Add a movie to the basket!")
      } else {
        backet.style.display = "inline"
        btn.forEach((e) => {
          e.style.display = "none"
        })
        add.forEach((e) => {
          e.style.display = "none"
        })
        if (Name.includes(a)) {
          alert("You can't give the same basket name!")
          bn.value = ""
          return;
        } else {
          // setName([...Name, a])
          backet.style.display = "inline"
          // example()
        }
      }
    } else {
      alert("Fill in the bucket name!")
      // bn.value=""
    }
  }

  return (
    <div className="main">
      <div className='header'>MUSTSEE</div>
      <input className="inp" type='text' placeholder='Search film' onChange={searchData} />
      <div className='big'>
        <div className="left">
          <div className='leftm'>
            {
              home.map((a, b) => (
                <div className="key" key={b}>
                  <img src={a.Poster} alt="poster" />
                  <div className="second">
                    <h1>{a.Title} ({a.Year})</h1>
                    <button className='add' onClick={name}>Add list</button>
                    <button>
                      <a href={`https://m.imdb.com/title/${a.imdbID}/?ref_=chttp_t_1`} target="_blank" rel="noopener noreferrer">
                        Details
                      </a>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
          {
            result.map((a, b) => (
              <div className="key" key={b}>
                <img src={a.Poster} alt="poster" />
                <div className="second">
                  <h1>{a.Title} ({a.Year})</h1>
                  <button className='add' onClick={name}>Add list</button>
                  <button>
                    <a href={`https://m.imdb.com/title/${a.imdbID}/?ref_=chttp_t_1`} target="_blank" rel="noopener noreferrer">
                      Details
                    </a>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="right">
          <div className='right2'>
            <input onClick={handle2} className='bn' type='text' placeholder='basket name' />
            <ul className='ul'>
              {
                Addedfilms.map((item, ind) => (
                  
                  <li className='mom' key={ind}>
                    <li className="new" >
                      <h3>{item}</h3>
                      <button className='delete' onClick={handle} >delete</button>
                    </li>
                  </li>
                ))
              }
            </ul>
            <button onClick={save}>Save</button>
            <button onClick={example} className='backet'>show backet</button>
            <button onClick={all}>Delete all</button>
          </div>
          <div className='list'></div>
        </div>
      </div>
    </div>
  )
}

export default Siyahi