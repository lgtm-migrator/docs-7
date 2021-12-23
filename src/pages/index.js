import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title" style={{ color: "white" }}>
          Flocon（フロコン）
        </h1>
        <p className="hero__subtitle" style={{ color: "white" }}>
          自鯖に設置できる新世代のTRPGオンラインセッションツール
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            ドキュメントを開く
          </Link>
          <Link
            style={{ marginLeft: 12 }}
            className="button button--secondary button--lg"
            href="https://sandbox-server.flocon.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            公式お試しサーバーを開く
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
