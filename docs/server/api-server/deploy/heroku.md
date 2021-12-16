---
title: "Heroku"
sidebar_position: 2
---

（TODO: 書きかけ）

# Heroku にデプロイする方法

このページでは、Heroku 上で API サーバーを動かす方法を解説します。

## Heroku にコードを push する

まず最初に[Heroku](https://jp.heroku.com/)のアカウントを用意して、Heroku CLI のインストールをしてください。

:::note
この解説では Heroku に `git push` してデプロイする方法を用いていますが、GitHub 連携などといった他の方法を利用しても構いません。
:::

次のコマンドを実行して、API サーバーを heroku にデプロイするファイルの雛形を入手します。

```
$ git clone https://github.com/flocon-trpg/heroku-api-getting-started.git
```

:::note
コマンドを実行する際は、$の文字は入力しないでください。
:::

ダウンロードされた `heroku-api-getting-started` フォルダはリネームしたり別の場所に移動しても構いません。

`heroku-api-getting-started` フォルダ内にある `api-server.Dockerfile` をテキストエディタで開き、`<VERSION>` の部分を利用したい API サーバーのバージョン名に置き換えます。

:::note
この解説の方法を用いると、API サーバーのデプロイには[Docker Hub 上にある Flocon の公式イメージ](https://hub.docker.com/repository/docker/kizahasi/flocon-api)が使われます。代わりに独自に作成したイメージを利用しても構いません。公式イメージのビルドに使われている Dockerfile は <https://github.com/flocon-trpg/servers/tree/main/docker> にあります。
:::

`heroku-api-getting-started` フォルダで、下のコマンドを実行して変更をコミットします。`update api-server.Dockerfile` の部分はわかりやすい文章に置き換えて構いません。

```bash
$ git commit -am "update api-server.Dockerfile"
```

:::note
`git clone` によってファイルを取得しているため、`heroku-api-getting-started` フォルダ内にはすでに `.git` フォルダが作成されています。そのためコミットする前に `git init` などをあらかじめ実行しておく必要はありません。
:::

次のコマンドを実行して、Heroku 上にアプリを作成します。`<Herokuアプリの名前>` の部分は好きな名前を入力してください。

```bash
$ heroku create "<Herokuアプリの名前>"
```

Heroku アプリはデフォルトの状態では Docker イメージによるビルドに対応していないため、次のコマンドを実行して対応させます。

```bash
$ heroku stack:set container
```

次のコマンドを実行して、作成されたアプリにデータを送信します。これにより自動的に Heroku でアプリのビルドが開始されます。ビルドが完了するまで数十秒程度かかります。

```bash
$ git push heroku main
```

これで Heroku に API サーバーのアプリケーションコードを反映させることができました。ですが、API サーバーを稼働させるためには、データベースの設定と環境設定が必要です。

## データベースの設定

API サーバーのデータベースには PostgreSQL と SQLite が使用できます。この解説では Heroku に付随するサービスである Heroku Postgres を利用する方法を解説します。

まず、<https://elements.heroku.com/addons/heroku-postgresql> にアクセスして、右上にある `Install Heroku Postgres` をクリックします。

![postgres1.png](/img/docs/heroku/postgres1.png)

`Add-on plan` からプランを選択して、`App to provision to` から先ほど作成したアプリを指定します。`Submit order form`をクリックすると PostgreSQL データベースが作成されます。

![postgres2.png](/img/docs/heroku/postgres2.png)

データベースの作成が成功すると、次の画面に移動します。

![postgres3.png](/img/docs/heroku/postgres3.png)

`Heroku Postgres` をクリックして Heroku Postgres の設定画面を開きます。

![postgres4.png](/img/docs/heroku/postgres4.png)

`Setting` をクリックします。`Database Credentials` の右にある `View Credentials` をクリックすると、Heroku PostgreSQL の URI（`postgres://` で始まる文字列）などが表示されます。この URI は環境設定で用いますので、必要であればメモしておきます。なお、この画面にはいつでもアクセスできます。

![postgres5.png](/img/docs/heroku/postgres5.png)

:::warn
この URI にはデータベースのパスワードなどが含まれているため、この URI を知っている人物はこのデータベースを自由に読み書きできます。そのため、この文字列は自分以外に知られないように注意してください。
:::

作成した Heroku アプリのトップページに移動します。

![heroku1.png](/img/docs/heroku/heroku1.png)

`Settings` タブをクリックして、`Reveal Config Vars` を開きます。

![heroku2.png](/img/docs/heroku/heroku2.png)

次のように値を設定します。設定できる値について詳しく知りたい方は[環境変数](../vars.md)のページを参照してください。

| KEY                           | VALUE                                                  | 必要性 | 備考                                                                       |
| ----------------------------- | ------------------------------------------------------ | ------ | -------------------------------------------------------------------------- |
| `AUTO_MIGRATION`              | `true`                                                 | 必須   |
| `ENTRY_PASSWORD`              | [こちらを参照](../vars.md#ENTRY_PASSWORD)              | 任意   |
| `FIREBASE_ADMIN_SECRET`       | [こちらを参照](../vars.md#ADMIN_SECRET)                | 必須   |
| `NEXT_PUBLIC_FIREBASE_CONFIG` | [こちらを参照](../vars.md#NEXT_PUBLIC_FIREBASE_CONFIG) | 必須   |
| `NODE_ENV`                    | `production`                                           | 任意   | `production`にすることで、デバッグモードではなく本番用モードで動作します。 |
| `POSTGRESQL`                  | [こちらを参照](../vars.md#POSTGRESQL)                  | 必須   |                                                                            |
