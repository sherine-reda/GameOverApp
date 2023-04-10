import React from 'react'
import styles from './CategoriesOpenWorld.module.css'
import { useParams } from 'react-router-dom';
import Games from '../Games/Games';
export default function CategoriesOpenWorld() {
  let params = useParams();
  let par = params?.category
  return <>
  <Games Parames={par} k="category" />
  </>;
}
