---
title: "Netlify（ドラッグ＆ドロップによるデプロイ）"
sidebar_position: 1
---

## Web サーバーのファイルを準備する

[Flocon のリリース一覧](https://github.com/flocon-trpg/servers/releases)からダウンロードしたいバージョンを探します。どのバージョンを選ぶべきかよくわからない場合は、基本的には Pre-release が付いているもの**以外**の中から最新のバージョンを選べば大丈夫だと思います。

選んだバージョンの下の方に`web-server-static.zip`のリンクがあるので、それをダウンロードしてファイルを解凍します。

解凍すると out フォルダが作成され、その中に`env.txt`というテキストファイルがあるかと思います。Flocon の [web-server 設定ツール](https://tools.flocon.app/web-server) を利用して`env.txt`にテキストを入力して保存します。

:::info
Firebase Storage 版アップローダーを有効化する場合は、あわせて[こちらの解説](/docs/server/uploader/firebase_storage)から Firebase Storage の設定を行う必要があります。
:::

必要であれば、`tos.md`を編集することで利用規約を、`privacy_policy.md`を編集することでプライバシーポリシーを設定することもできます。これらは Markdown という言語で記述します。編集はメモ帳などのテキストエディタで可能です。

これで Web サーバーのファイルの準備は完了しました。次に Netlify にこれらのファイルをアップロードします。

## Netlify にデプロイする

まずは[Netlify](https://www.netlify.com/)からアカウントを作成します。

アカウントの作成が完了したら、下のような画面になります。「Drag and drop you site output folder here」のところに out フォルダをドラッグ＆ドロップします。

![netlify1.png](/img/docs/netlify/1.png)

:::danger
out フォルダの中身はほぼ全て[^1]がそのままの形でサイト上で公開されます。そのため、out フォルダ内に機密情報などに関わるデータを含めないように気をつけてください。
:::

:::info
[web-server 設定ツール](https://tools.flocon.app/web-server) などを用いて`env.txt`ファイルに記述した設定は、通常であれば`env.txt`を参照しなくともサイトにアクセスすれば誰でも取得可能な値であるため、誤って機密情報に関わるデータやコメントを記述したりしていない限りは`env.txt`ファイルをサイト上で公開することに問題はありません。
:::

デプロイが成功したら、下の画面になります。いったんランダムな URL が割り当てられています。この URL にアクセスしてみて、Flocon のトップページが表示されていれば成功です。

![netlify1.png](/img/docs/netlify/2.png)

URL はこのままでも構いませんが、もし変更したい場合は`Site settings` > `Domain management` の `Custom domains` > `Options` などから変更できます。

次に、[この解説](../firebase_auth.md)を参照してユーザーがこのサイトにログインできるようにします。

お疲れさまでした！これで Flocon のサーバー設置は完了です 🎉。この Netlify の URL にアクセスすればどなたでも Flocon を利用することができます。

### Web サーバーをバージョンアップする方法

バージョンアップした状態の Web サーバーのファイルを同様の方法で準備して、`Deploys` の `Need to update your site?…`に同じようにドラッグ＆ドロップすることでサイトのファイルが置き換わります。

![netlify3.png](/img/docs/netlify/3.png)

[^1]: `Thumbs.db`など一部のファイルは自動的に除外されるようです
