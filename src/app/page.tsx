import Image from "next/image";
import dynamic from 'next/dynamic';

const  Header = dynamic(() => import('../components/Header/Header'));
const  Cards = dynamic(() => import('../components/Cards/Cards'));

export default function Home() {
  return (
  <>
  <Header/>
  <Cards/>
  </>
  );
}
