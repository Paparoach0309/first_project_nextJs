import React, { useMemo, useState } from "react";
import styles from "@/styles/Cameras.module.css";
import Router, { useRouter, withRouter } from "next/router";
import Image from "next/image";
import profilePic from "../public/next.svg";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  console.log(context);
  const result = await fetch(
    `https://getlens-master.s.dev.family/api/pages/obektivy`
  );
  const data = await result.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}

interface IProduct {
  products: object | null;
  image: object | null;
  category: object;
  title: string;
  slug: string;
  price: string;
  id: number;
}

const cameras = (data: any) => {
  const [priceMin, setPriceMin] = useState<string>();
  const [priceMax, setPriceMax] = useState<string>();
  const fotoItems: IProduct[] = useMemo(() => data.data.products || [], []);
  const filterCanon = () =>
    Router.push({
      // pathname: "/cameras",
      query: { brands: "1", priceMin: priceMin, priceMax: priceMax },
    });
  const filterNikon = () =>
    Router.push({
      // pathname: "/cameras",
      query: { brands: "9" },
    });
  const handlerPriceMin = () =>
    Router.push({
      // pathname: "/cameras",
      query: { priceMin: priceMin },
    });
  const handlerPriceMax = () =>
    Router.push({
      // pathname: "/cameras",
      query: { priceMax: priceMax },
    });
  const route = useRouter();
  const brand = route.query;
  return (
    <main className={styles.main}>
      <div className={styles.sidebar}>
        <p>Товаров {data.data.meta.total}</p>
        <h2>Камеры</h2>
        <form>
          <input
            className={styles.textInputLeft}
            type="number"
            onChange={(e) => {
              setPriceMin(e.target.value);
              setTimeout(() => {
                handlerPriceMin();
              }, 1000);
            }}
          />
          <input
            className={styles.textInputRight}
            type="number"
            onChange={(e) => {
              setPriceMax(e.target.value);
              setTimeout(() => {
                handlerPriceMax();
              }, 1000);
            }}
          />
        </form>
        <h3>Бренд</h3>
        <div>
          <input type="checkbox" />
          <label>Canon</label>
          {/* <button onClick={filterCanon}>Canon</button> */}
        </div>
        <div>
          <input type="checkbox" onClick={(e) => console.log(e.target.addEventListener)} />
          <label>Nikon</label>
          {/* <button onClick={filterNikon}>Nikon</button> */}
        </div>
      </div>
      <div className={styles.list}>
        {fotoItems.map((item: any) => (
          <div className={styles.ListTop} key={item.id}>
            <Image
              src={
                item.image === null ? profilePic : item.image.desktop.webp_x1
              }
              alt={item.title}
              width={240}
              height={240}
            />
            <div className={styles.ListBottom}>
              <p>{item.title}</p>
              <button className={styles.ListButtom}>В корзину</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default cameras;
