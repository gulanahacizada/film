import React from 'react'
import "./Siyahi.css"
import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import "./Siyahi"
import Siyahi from './Siyahi';
function Backet({Name, setName}) {
  const example = () => {
    let ul = document.querySelector(".ul")
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
        h22.innerText = "---------------------------"
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
  return (
    <div className='list' >
    
      </div>
  )
}

export default Backet