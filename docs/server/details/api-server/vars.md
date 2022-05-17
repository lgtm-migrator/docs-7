---
title: "環境変数の一覧"
sidebar_position: 3
---

import { Fragment } from 'react'
import { ApiVarExample as Example } from '@site/src/components/ApiVarExample';

## ACCESS_CONTROL_ALLOW_ORIGIN（省略可）

API サーバーから送信される値に`Access-Control-Allow-Origin`ヘッダーを設定します。通常は、[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED)を有効化していない場合は設定する必要はありません。

### 入力例

<Example
keyName='ACCESS_CONTROL_ALLOW_ORIGIN'
value='https://example.com' />

## AUTO_MIGRATION（省略可）{#AUTO_MIGRATION}

`true`にすることで、データベースのマイグレーションが自動的に行われます。

:::caution
データベース内に消失を望まないデータがある場合は、API サーバーをアップデートする前にそのアップデートにより自動マイグレーションが行われるかどうかを確認して、もしそうであれば念のため事前にデータベースなどのバックアップを取ることを検討してください。
:::

### 入力例

<Example
keyName='AUTO_MIGRATION'
value='true' />

## EMBUPLOADER_ENABLED（省略可）{#EMBUPLOADER_ENABLED}

`true`にすることで、API サーバー内蔵アップローダーが有効化されます。

:::info
API サーバー内蔵アップローダーは、Firebase Storage 版アップローダーとは異なります。
:::

## EMBUPLOADER_COUNT_QUOTA（省略可）

[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED) が有効化されているときにのみ使われます。

1 ユーザーが API サーバーにアップロードできるファイルの個数の上限を設定できます。値がない場合は上限は設けられません。

## EMBUPLOADER_MAX_SIZE（省略可）

[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED) が有効化されているときにのみ使われます。

アップローダーに保存するファイルの合計サイズの上限を設定できます。単位はバイトです。値がない場合は上限は設けられません。

## EMBUPLOADER_PATH（省略可）

[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED) が有効化されているときにのみ使われます。

API サーバー内蔵アップローダーのファイルを保存するパスを設定します。値がない場合は API サーバー内蔵アップローダーは無効化されます。

<Example
keyName='EMBUPLOADER_PATH'
value='./uploader' />

## EMBUPLOADER_SIZE_QUOTA（省略可）

[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED) が有効化されているときにのみ使われます。

1 ユーザーが API サーバーにアップロードできる合計ファイルサイズの上限を設定できます。単位はバイトです。値がない場合は上限は設けられません。

## ENTRY_PASSWORD（必須）{#ENTRY_PASSWORD}

エントリーパスワード（サイトを利用するために必要なパスワード）を設定できます。JSON フォーマットで入力する必要があります。

:::note
エントリーパスワードの設定し忘れを防ぐため、`ENTRY_PASSWORD`に値がセットされていない場合は API サーバーは稼働せずエラーとなるようにしています。
:::

### 入力例

#### パスワードを設定しない場合

<Example
keyName='ENTRY_PASSWORD'
value='{"type":"none"}' />

#### 平文でパスワードを設定する場合

<Example
keyName='ENTRY_PASSWORD'
value='{"type":"plain","value":"******"}' />

`*`の部分はユーザーに要求するパスワードに置き換えてください。

#### bcrypt のハッシュ値でパスワードを設定する場合

<Example
keyName='ENTRY_PASSWORD'
value='{"type":"bcrypt","value":"$2b$10$ABC.defgh.igklmnopq/qwertyuiopasdfghjklzxcvbnm0123"}'
valueOfDotEnv='{"type":"bcrypt","value":"\$2b\$10\$ABC.defgh.igklmnopq/qwertyuiopasdfghjklzxcvbnm0123"}'
descriptionOfDotEnv={<Fragment><code>$</code>はこの例のようにエスケープする必要があります。</Fragment>} />

## FIREBASE_ADMIN_SECRET（特定の状況を除いて必須）{#FIREBASE_ADMIN_SECRET}

Firebase 管理ページから生成した Firebase Admin SDK の秘密鍵の値を設定できます。Google Compute Engine、Google App Engine など**以外**で API サーバーを動かす場合は、この設定は必須です。

:::info
Firebase と同じサービスアカウントで管理している Google Compute Engine、Google App Engine などで API サーバーを動かす場合は、この値を設定しないことを推奨します。この値が設定されていない場合、API サーバーは[Firebase Admin SDK をパラメーターなしで初期化する](https://firebase.google.com/docs/admin/setup#initialize-without-parameters)ためです。
:::

Firebase Admin SDK の秘密鍵ファイルは次の方法で取得できます。

Firebase の `プロジェクトの設定`（Firebase 管理ページ左上にある歯車アイコンから開けます） の `サービスアカウント` タブの下の方にある`新しい秘密鍵の生成`ボタンをクリックします。

![1.png](/img/docs/vars/firebase_admin/1.png)

:::danger
秘密鍵を生成する際に表示されるメッセージにもあるとおり、秘密鍵のデータは第三者に漏洩しないように注意して管理してください。
:::

### 入力例

<Example
keyName='FIREBASE_ADMIN_SECRET'
value='{"private_key":"-----BEGIN PRIVATE KEY-----\n********************\n-----END PRIVATE KEY-----\n","client_email":"************.iam.gserviceaccount.com"' />

`*`の部分を適切な文字列に置き換えてください。なお、実際の`private_key`の値はこの例と比べて非常に長いです。

## HEROKU（省略可） {#HEROKU}

`true`をセットすることで、Heroku に適したモードで API サーバーが稼働します。具体的には、次のような挙動になります。

- `DATABASE_URL`という環境変数がある場合、それをデータベースの URL として利用する。
- Heroku PostgreSQL に対応した方法でデータベースに接続される。

## NODE_ENV （省略可）

`production`をセットすると、API サーバーが本番環境のモードで実行されるようになります。デバッグ目的などでない限りは`production`をセットすることが望ましいです。

```note
これは正確にはFloconのAPIサーバーではなくNode.jsによる仕様です。
```

### 入力例

<Example
keyName='NODE_ENV'
value='production' />

## PORT（省略可）

ポート番号を設定できます。

:::caution
Heroku にデプロイする場合は設定しないでください。
:::

## POSTGRESQL（省略可）{#POSTGRESQL}

PostgreSQL の設定を行うことができます。

:::caution
`POSTGRESQL`と`SQLITE`のうち、少なくとも 1 つの値を設定する必要があります。
:::

### 入力例

<Example
keyName='POSTGRESQL'
value='{"clientUrl":"postgresql://myuser:mypassword@localhost:5432/mydbname"}'
valueOfHeroku='{"clientUrl":"postgresql://myuser:mypassword@localhost:5432/mydbname", "driverOptions":{"connection": {"ssl": {"rejectUnauthorized": false}}}}'
descriptionOfHeroku={<Fragment>Heroku の場合は、この例のように<code>{'"driverOptions":{"connection": {"ssl": {"rejectUnauthorized": false}}}'}</code>も JSON に書き加えなければ正常に動作しない可能性があります。</Fragment>} />

## ROOMHIST_COUNT（省略可）

部屋の変更履歴を保持する個数を設定できます。設定しないか負の値を指定すると、変更履歴がすべて保持されるようになります。なお、`ROOMHIST_COUNT` の設定の有無に関わらず、部屋が削除される際は同時にその部屋の変更履歴もすべて削除されます。

使用しているデータベースの列やファイルサイズに大きな制限がない場合は、よほど長期間同じ部屋を使いまわしたりしない限り `ROOMHIST_COUNT` は設定しなくても問題ないと思われます。

:::caution
Heroku Postgres の Hobby Dev プランを使用する際は、3 ～ 20 程度の値を指定することを推奨します。
:::

:::info
変更履歴が保持される理由は、部屋の編集で衝突が起こった際に解決できるようにするためです。そのため 0 などを指定すると編集の衝突を解決できなくなる可能性が高くなります。また、現時点では変更履歴をブラウザなどから閲覧する機能はありません。
:::

### 入力例

<Example
keyName='ROOMHIST_COUNT'
value='10' />

## SQLITE（省略可）

SQLite の設定を行うことができます。

:::caution
`POSTGRESQL`と`SQLITE`のうち、少なくとも 1 つの値を設定する必要があります。
:::

### 入力例

<Example
keyName='SQLITE'
value='{"dbName":"./flocon-api.sqlite3"}' />
