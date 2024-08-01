import Head from 'next/head'
import Header from '../components/header'

export default function Layout({ children }) {
  return (
<>
<Header/>
<main>{children}</main>
</>
  )
}
