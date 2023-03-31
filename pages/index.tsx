import Head from 'next/head' 
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MyCalendar from '@/components/_calendar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <Head>
          <title>React-big-calendar test</title>
          <meta name="description" content="React-big-calendar test" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={styles.main}>
          <MyCalendar />
        </main>
    </>
  )
}
