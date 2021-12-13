---
title: "環境変数"
sidebar_position: 3
---

import { ApiVarExample as Example } from '../../../src/components/ApiVarExample';

## ACCESS_CONTROL_ALLOW_ORIGIN（省略可）

API サーバーから送信される値に`Access-Control-Allow-Origin`ヘッダーを設定します。通常は[EMBUPLOADER_ENABLED](#EMBUPLOADER_ENABLED)を有効化していない場合は設定する必要はありません。

### 入力例

<Example
keyName='ACCESS_CONTROL_ALLOW_ORIGIN'
value='https://example.com' />

## AUTO_MIGRATION（省略可）

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

## ENTRY_PASSWORD（必須）

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
descriptionOfDotEnv={<><code>$</code>はこの例のようにエスケープする必要があります。</>} />

## FIREBASE_ADMIN_SECRET（特定の状況を除いて必須）

Firebase 管理ページから生成した Firebase Admin SDK の秘密鍵の値を設定できます。Google Compute Engine、Google App Engine など**以外**で API サーバーを動かす場合は、この設定は必須です。

:::info
Firebase と同じサービスアカウントで管理している Google Compute Engine、Google App Engine などで API サーバーを動かす場合は、この値を設定しないことを推奨します。この値が設定されていない場合、API サーバーは[Firebase Admin SDK をパラメーターなしで初期化する](https://firebase.google.com/docs/admin/setup#initialize-without-parameters)ためです。
:::

### 入力例

<Example
keyName='FIREBASE_ADMIN_SECRET'
value='{"private_key":"-----BEGIN PRIVATE KEY-----\n********************\n-----END PRIVATE KEY-----\n","client_email":"************.iam.gserviceaccount.com"' />

`*`の部分を適切な文字列に置き換えてください。なお、実際の`private_key`の値はこの例に比べて非常に長いです。

### Firebase Admin SDK の秘密鍵ファイルの取得

Firebase Admin SDK の秘密鍵ファイルは次の方法で取得できます。

Firebase の `プロジェクトの設定`（Firebase 管理ページ左上にある歯車アイコンから開けます） の `サービスアカウント` タブの下の方にある`新しい秘密鍵の生成`ボタンをクリックします。表示される説明にもあるとおり、秘密鍵の情報は機密扱いで管理する必要があります。

![1.png](/img/docs/vars/firebase_admin/1.png)

`キーを生成`ボタンを押すと JSON ファイルがダウンロードされます。これを開き、`private_key`と`client_email`の値を参照して、入力例を参考にして`FIREBASE_ADMIN_SECRET`を設定してください。JSON ファイル内のその他の値は`FIREBASE_ADMIN_SECRET`には必要ありません。

## NEXT_PUBLIC_FIREBASE_CONFIG（必須）{#NEXT_PUBLIC_FIREBASE_CONFIG}

Firebase の `プロジェクトの設定`（Firebase 管理ページ左上にある歯車アイコンから開けます） の `全般` タブの下の方にある `SDKの構成と設定` にある値を**JSON フォーマット**で入力します。

![firebase_config.png](/img/docs/vars/firebase_config/1.png)

なお、デフォルトの状態では `SDKの構成と設定` は 1 つもありません。その場合は[アプリの追加方法](#add_firebase_app)から追加してください。

### 入力例

<Example
keyName='NEXT_PUBLIC_FIREBASE_CONFIG'
value='{"apiKey":"****************","authDomain":"***-*****.firebaseapp.com","databaseURL":"https://***-*****.firebaseio.com","projectId":"***-*****","storageBucket":"***-*****.appspot.com","messagingSenderId":"**********","appId":"****************"}' />

`*`の部分を適切な文字列に置き換えてください。

### アプリの追加方法 {#add_firebase_app}

左上の「プロジェクトの概要」の右にある歯車から「プロジェクトの設定」を選択します。

下の方にある、青い丸に白抜き文字で`</>`と書かれているボタンをクリックします。

![7.png](/img/docs/vars/firebase_config/2.png)

サイトの説明に従って、「アプリのニックネーム」を入力して「アプリを登録」ボタンを押します。自分がわかりやすい名前で構わないと思います。

![8.png](/img/docs/vars/firebase_config/3.png)

「Firebase SDK の追加」に SDK の情報が表示されますが、後でいつでも表示し直すことができるため、無視して下の「コンソールに進む」ボタンを押して構いません。`npm install firebase`も実行する必要はありません。

![9.png](/img/docs/vars/firebase_config/4.png)

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

## POSTGRESQL（省略可）

PostgreSQL の設定を行うことができます。

:::caution
`POSTGRESQL`と`SQLITE`のうち、少なくとも 1 つの値を設定する必要があります。
:::

### 入力例

<Example
keyName='POSTGRESQL'
value='{"clientUrl":"postgresql://myuser:mypassword@localhost:5432/mydbname"}'
valueOfHeroku='{"clientUrl":"postgresql://myuser:mypassword@localhost:5432/mydbname", "driverOptions":{"connection": {"ssl": {"rejectUnauthorized": false}}}}'
descriptionOfHeroku={<>Heroku の場合は、この例のように<code>{'"driverOptions":{"connection": {"ssl": {"rejectUnauthorized": false}}}'}</code>も JSON に書き加えなければ正常に動作しない可能性があります。</>} />

## ROOMHIST_COUNT（省略可）

部屋の変更履歴を保持する個数を設定できます。設定しないか負の値を指定すると、変更履歴がすべて保持されるようになります。なお、`ROOMHIST_COUNT` の設定の有無に関わらず、部屋が削除される際は同時にその部屋の変更履歴もすべて削除されます。

使用しているデータベースの列やファイルサイズに大きな制限がない場合は、よほど長期間同じ部屋を使いまわしたりしない限り `ROOMHIST_COUNT` は設定しなくても問題ないと思われます。

:::caution
Heroku Postgres の Hobby Dev プランを使用する際は、5 ～ 20 程度の値を指定することを推奨します。
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
