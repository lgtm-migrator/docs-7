---
title: "APIサーバー"
sidebar_position: 1
---

# API サーバーをアップデートする方法

設置済みの API サーバーのアップデートは手動で行う必要があります。ここでは git を用いたアップデート方法を説明します。

:::caution
もし削除されてほしくない部屋データなどがある場合は、事前に Heroku Postgres のバックアップ機能を用いて、データベースのバックアップを取っておくことを推奨します。
:::

まず [Heroku CLI と git をインストール](https://devcenter.heroku.com/ja/articles/heroku-cli)します。

次のコマンドを実行して、`Deploy to Heroku`ボタンのソースコードを入手します。

```
$ git clone https://github.com/flocon-trpg/heroku-api-getting-started.git
```

:::note
コマンドを実行する際は、$の文字は入力しないでください。
:::

ダウンロードされた `heroku-api-getting-started` フォルダはリネームしたり別の場所に移動しても構いません。

`heroku-api-getting-started` フォルダ内にある `api-server.Dockerfile` をテキストエディタで開き、`ARG branch=` で始まる行を探して、アップデートさせたいバージョンに置き換えます。

`heroku-api-getting-started` フォルダで、次のコマンドを実行して変更をコミットします。`update api-server.Dockerfile` の部分は他の文章に置き換えても構いません。

```bash
$ git commit -am "update api-server.Dockerfile"
```

次のコマンドを実行して、heroku にコードを push する準備を整えます。`<APIサーバーのアプリケーション名>`の部分は、（後から変更していない場合は）`App name`に入力した名前と同じになります。

```bash
$ heroku git:remote -a <APIサーバーのアプリケーション名>
```

次のコマンドを実行して、Heroku にデータを送信します。アップデートが完了するまで数分程度かかります。この間にログが表示されますが、これは Heroku から出力されているログを自動的に読み取っているだけであるため、通常は問題ありません。

```bash
$ git push heroku main
```

これでアップデートは完了です。