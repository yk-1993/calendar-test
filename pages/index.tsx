import Head from 'next/head' 
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MyCalendar from './_calendar'

const inter = Inter({ subsets: ['latin'] })
const events = [
  {
    title: "ミーティング1",
    start: new Date(2023, 2, 21, 10, 0, 0),
    end: new Date(2023, 2, 21, 12, 0, 0),
    user:"テスト太郎"
  },
  {
    title: "ミーティング2",
    start: new Date(2023, 2, 22, 12, 0, 0),
    end: new Date(2023, 2, 22, 13, 0, 0),
    user:"テスト次郎"
  },
  {
    title: "ミーティング3",
    start: new Date(2023, 2, 22, 16, 0, 0),
    end: new Date(2023, 2, 22, 18, 0, 0),
    user:"テスト三郎"
  },
  {
    title: "ミーティング4",
    start: new Date(2023, 2, 29, 16, 0, 0),
    end: new Date(2023, 2, 29, 18, 0, 0),
    user:"テスト木村"
  },
  {
    title: "ミーティング5",
    start: new Date(2023, 2, 30, 16, 0, 0),
    end: new Date(2023, 2, 30, 18, 0, 0),
    user:"テスト木村2"
  },
  // その他のイベント...
];

export default function Home() {
  return (
    <>
      <Head>
        <title>React-big-calendar test</title>
        <meta name="description" content="React-big-calendar test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <MyCalendar events={events} />
      </main>
    </>
  )
}
