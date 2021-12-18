---
sidebar_position: 1
---

# はじめに

## コンセプト

Flocon を動作させるには、[Firebase]、API サーバー、Web サーバーの 3 つのセットアップが原則として必要です。

![構成](/img/docs/servers-min.png)

:::tip
画像では Web サーバーと API サーバーが独立していますが、実際はこれら 2 つのプログラムは 1 つのサーバー上で同時に動かすことも可能です。そのため、Flocon サイトを構築する際に、必ずしもサーバーを 2 つ以上用意する必要はありません。
:::

### Firebase

[Firebase]は、Google が提供している、Web サイトの運用に役立つサービスプラットフォームです。Flocon は Firebase を利用して作られています。

Firebase は複数のサービスから構成されていますが、そのうち Flocon が対応しているサービスは、Firebase Authentication と Firebase Storage の 2 つです。

#### Firebase Authentication（必須）

Firebase Authentication は、安全なアカウント管理およびログイン機能を簡単にセットアップできるサービスです。これにより、Flocon のログイン機能が実現されます。

ログイン機能を Flocon に実装している理由は次のとおりです。

- Firebase Storage サービスが使える。これにより身内サーバー程度の用途であれば、**Heroku Free プランなどでも永続的にファイルを保存できるアップローダーを無料で作成できる**。
- アップロードしたファイルを、1 つの部屋のみではなく全ての部屋で扱うことができる。
- （まだ実装していませんが）例えば自分の作成した部屋をすべて取得するなど、アカウントに紐付いた機能が実装しやすくなる。

Firebase Authentication ではアカウントのパスワードなどの重要な機密情報は Google によって管理されるため、個人で Flocon サーバーを設置してもそういった機密情報が漏洩するリスクが最小限になるというメリットがあります。

通常は、Flocon サーバーごとに Firebase アカウントを作成して Firebase Authentication をセットアップします。Firebase Authentication によって登録されたアカウントの情報は Firebase アカウントごとに管理されます。そのため、（サーバー管理者などが同一でない限り）他の Flocon サーバーのアカウント情報を取得したり、Flocon 作者が全ての Flocon サーバーのアカウントを一元的に管理する、といった行為はできません。

Flocon サーバーをセットアップするには、Firebase Authentication は必須です。ですが、2021 年 12 月現在で[Firebase Authentication は電話認証などといった特殊な機能を使わない限りは無料で利用できます](https://firebase.google.com/pricing?hl=ja)し、先述したとおり通常のログイン機能よりは安全性が高い面もあるため、基本的には Firebase Authentication と連携することによるメリットのほうが大きいと思われます。

#### Firebase Storage（任意）

Firebase に付属するオンラインストレージサービスです。Flocon のアップローダーとして利用可能です。

2021 年 12 月現在で、[無料枠の範囲内でも合計 5GB までのファイルの保存と 1 日あたり 1GB までのデータの送信が可能](https://firebase.google.com/pricing?hl=ja)であるため、身内サーバー程度の用途であれば無料で使うことはじゅうぶん可能だと思います。

Firebase Storage は、Heroku などのようにサーバー上のデータがリセットされるサービスでもデータを永続的に保管できるため、大きな効果を発揮します。

ちなみに Flocon では、Firebase Storage を用いたアップローダーの他にも、API サーバーのストレージにデータを保管するアップローダー（API サーバー内蔵アップローダー）も使用可能です。片方のアップローダーだけを有効化することも、両方のアップローダーを有効化もしくは無効化することも可能です。

### Web サーバー (必須)

Web サーバーは、HTML ファイル、JavaScript ファイル、CSS ファイルなどの静的ファイルを各ブラウザに配信します。これらには現在の部屋の状態などといった動的なデータは含まれていません。動的なデータは API サーバーから送信されます。

### API サーバー (必須)

API サーバーの主な役割は、部屋データなどといった動的に変わるデータを保存、管理し、ブラウザと通信することです。

## サーバー設置の流れ

[Firebase Authentication](./firebase)、[API サーバー](./api-server/intro)、[Web サーバー](./web-server/intro)をすべてセットアップします。

アップローダーを設置する場合は、あわせて[アップローダー](./uploader/intro)の解説も参照してください。

[firebase]: https://firebase.google.com/?hl=ja
