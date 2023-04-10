import React from 'react'
import styles from './SortedByReleaseDate.module.css'
import { useParams } from 'react-router-dom';
import Games from '../Games/Games';
export default function SortedByReleaseDate() {
  let params = useParams();
  let par = params?.sortBy
  return <>
  <Games Parames={par} k="sort-by" />
  </>;
}
