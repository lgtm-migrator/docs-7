---
title: "Heroku"
sidebar_position: 2
---

このページでは Heroku に API サーバーを設置する方法を説明します。

## Heroku アカウントを用意する

もし Heroku アカウントを持っていない場合は、[Heroku](https://jp.heroku.com)でアカウントを作成してください。

## API サーバーを設置する方法

[リリース一覧](https://github.com/flocon-trpg/servers/releases)から、設置したい API サーバーのバージョンを探し、`Deploy to Heroku`というボタンをクリックします。基本的には Pre-release が付いているもの**以外**の中から最新のバージョンを選べば大丈夫だと思います。

`Deploy to Heroku`ボタンをクリックすると、下のような画面が表示されると思います。

![deploy_to_heroku.png](/img/docs/heroku/deploy_to_heroku.png)

設定する場所は、`App name`と`ENTRY_PASSWORD`と`FIREBASE_ADMIN_SECRET`の 3 つです。

`App name`には自分がわかりやすい名前を入力します。

`Choose a region`は、日本からの利用が多そうであれば United States のままで問題ありません。

必要であれば、`ENTRY_PASSWORD`を変更してください。

`FIREBASE_ADMIN_SECRET`には、Firebase Admin SDK の秘密鍵ファイルの中身をそのまま入力してください。Firebase Admin SDK の秘密鍵ファイルの生成方法は、[こちらのページ](../firebase_admin)を参照してください。

Config Vars の内容は後からでも変更できます。

最後に`Deploy app`ボタンを押すことで API サーバーのセットアップが自動的に始まります。完了するまで数分程度かかります。

完了したら、画面下部に表示される`View`ボタンを押してみましょう。「API サーバーは稼働しています😊」という画面が表示されていれば成功です🎉。次にWebサーバーの設置を行ってください。

## Herokuに課金する際の注意点

Herokuは無料で利用できますが、課金することでAPIサーバーの性能をアップグレードすることも可能です。

`Deploy to Heroku`ボタンからAPIサーバーを設置した場合、Heroku PostgresのHobby Devプラン（無料プラン）が合わせて自動的に設定されます。Heroku PostgresはHeroku公式のアドオンですが、Herokuへの課金とHeroku Postgresへの課金は別体系ですので注意してください。もし課金する場合はどこにボトルネックがあるかを確認してどのように課金するかを事前に検討してください。

## API サーバーをバージョンアップする方法

設置済みの API サーバーのバージョンアップは手動で行う必要があります。ここでは git を用いたアップデート方法を説明します。

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

`heroku-api-getting-started` フォルダ内にある `api-server.Dockerfile` をテキストエディタで開き、`ARG branch=` で始まる行を探して、バージョンアップさせたいバージョンに置き換えます。

`heroku-api-getting-started` フォルダで、次のコマンドを実行して変更をコミットします。`update api-server.Dockerfile` の部分は他の文章に置き換えても構いません。

```bash
$ git commit -am "update api-server.Dockerfile"
```

次のコマンドを実行して、heroku にコードを push する準備を整えます。`<APIサーバーのアプリケーション名>`の部分は、（後から変更していない場合は）`App name`に入力した名前と同じになります。

```bash
$ heroku git:remote -a <APIサーバーのアプリケーション名>
```

次のコマンドを実行して、Herokuにデータを送信します。アップデートが完了するまで数分程度かかります。この間にログが表示されますが、これはHerokuから出力されているログを自動的に読み取っているだけであるため、通常は問題ありません。

```bash
$ git push heroku main
```

これでアップデートは完了です。
