---
title: "APIサーバーを設置する"
sidebar_position: 3
---

このページでは [Heroku](https://jp.heroku.com) に API サーバーを設置する方法を説明します。

## Heroku について

Heroku は、クラウド上にサーバーを設置できる、比較的老舗のサービスです。無料で運用できるのと、専門的な知識がなくても比較的安全に設置できるのが特徴です。

## Heroku アカウントを用意する

もし Heroku アカウントを持っていない場合は、[Heroku のサイト](https://jp.heroku.com)からアカウントを作成してください。

## API サーバーを設置する方法

[リリース一覧](https://github.com/flocon-trpg/servers/releases)から、設置したい API サーバーのバージョンを探し、`Deploy to Heroku`というボタンをクリックします。基本的には`Deploy to Heroku`というボタンがあり、なおかつ Pre-release が付いていないものの中から最新のバージョンを選べば大丈夫だと思います。

`Deploy to Heroku`ボタンをクリックすると、下のような画面が表示されると思います。

![deploy_to_heroku.png](/img/docs/heroku/deploy_to_heroku.png)

設定する場所は、`App name`と`ENTRY_PASSWORD`と`FIREBASE_ADMIN_SECRET`の 3 ヶ所です。

`App name`には自分がわかりやすい名前を入力します。

`Choose a region`は、日本国内からの利用が多そうであれば United States のままで問題ありません。

必要であれば、`ENTRY_PASSWORD`を変更してください。

`FIREBASE_ADMIN_SECRET`には、Firebase Admin SDK の秘密鍵ファイルの中身をそのまま入力してください。秘密鍵ファイルは次の方法で取得できます。

Firebase の `プロジェクトの設定`（Firebase 管理ページ左上にある歯車アイコンから開けます） の `サービスアカウント` タブの下の方にある`新しい秘密鍵の生成`ボタンをクリックします。

![1.png](/img/docs/vars/firebase_admin/1.png)

:::danger
秘密鍵を生成する際に表示されるメッセージにもあるとおり、秘密鍵のデータは第三者に漏洩しないように注意して管理してください。
:::

以上で設定は完了です。Config Vars の内容は後からでも変更できます。

最後に`Deploy app`ボタンを押すことで API サーバーのセットアップが自動的に始まります。完了するまで数分程度かかります。

完了したら、画面下部に表示される`View`ボタンを押してみましょう。「API サーバーは稼働しています 😊」という画面が表示されていれば成功です。この画面の URL（デフォルトでは`https://***.herokuapp.com/`のような形式です）は後で Web サーバーの設定に用いるので、どこかにメモしておくと後の手間が少し省けます。

次は[Web サーバーを設置する](./web_server.md)のページをご覧ください。

## Heroku に課金する際の注意点

Heroku は無料で利用できますが、課金することで API サーバーの性能をアップグレードすることも可能です。

`Deploy to Heroku`ボタンから API サーバーを設置した場合、Heroku Postgres の Hobby Dev プラン（無料プラン）が合わせて自動的に設定されます。Heroku Postgres は Heroku 公式のアドオンですが、Heroku への課金と Heroku Postgres への課金は別体系ですので注意してください。もし課金する場合は、どこにボトルネックがあるかを確認してからどのように課金するかを事前に検討してください。
