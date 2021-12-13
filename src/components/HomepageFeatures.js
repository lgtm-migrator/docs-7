import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "個人サーバー上でTRPGオンラインセッション",
    Svg: require("../../static/img/server-svgrepo-com.svg").default,
    description: (
      <>
        Floconは、個人サーバー上での運用にフォーカスしたTRPGオンラインセッションツールです。公開サーバーとしての運用にも対応しています。
      </>
    ),
  },
  {
    title: "無料で利用、無料でサーバー設置",
    Svg: require("../../static/img/money-svgrepo-com.svg").default,
    description: (
      <>
        Floconのアプリケーションコードは、
        <a href="https://github.com/flocon-trpg/servers/blob/main/LICENSE">
          MIT License
        </a>
        のもとで自由にご利用いただけます。サーバーも、
        <a href="https://heroku.com">Heroku</a>
        などを利用すれば無料で設置できます。
      </>
    ),
  },
  {
    title: "柔軟なデプロイ方法",
    Svg: require("../../static/img/square-svgrepo-com.svg").default,
    description: (
      <>
        Heroku、Google Cloud、Vercel、Netlify、オンプレミスなど様々な方法でデプロイが可能です。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center" style={{ padding: "20px 0" }}>
        <Svg
          className={styles.featureSvg}
          alt={title}
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
