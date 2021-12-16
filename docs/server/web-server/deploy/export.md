---
title: "静的ファイル（Netlify）"
sidebar_position: 2
---

# 静的ファイルを用いたデプロイ方法

大まかな流れとしては、ソースコードから静的ファイルを生成して、それをホスティングサイトにアップロードする形になります。

## 静的ファイルを生成する

Node.jsのv16もしくはv14がインストールされていない場合はインストールしてください。npmもあわせてインストールしてください（通常はNode.jsと一緒にインストールされます）。

Node.jsとnpmのバージョンは次のコマンドで確認できます。

```bash
$ node --version
$ npm --version
```

:::note
コマンドを実行する際は、$の文字は入力しないでください。
:::

yarnがインストールされていない場合は、次のコマンドを実行してyarnをインストールします。

```bash
$ npm install -g yarn
```

:::note
Floconはnpmやpnpmには対応していないため、yarnは必須です。
:::

APIサーバーのソースコードをダウンロードします。様々な方法がありますが、ここでは `git clone` を用いてダウンロードする方法を解説します。下のコマンドを実行してGitHubからソースコードをダウンロードします。なお、この例では `-b` には `release` ブランチを指定していますが、代わりにタグを指定することもできます。

```console
$ git clone https://github.com/flocon-trpg/servers.git -b release --depth 1
```

ダウンロードされた `server` フォルダはリネームしたり別の場所に移動しても構いません。ただし、パスに全角文字が含まれているとエラーが出ることがあるため、全角文字を含まないようにすることを推奨します。

`server/apps/web-server` フォルダ内で `.env.local` ファイルを作成します。

:::info
Windowsの場合は、設定でファイルの拡張子を表示するようにしてください。
:::

作成した `.env.local` ファイルをメモ帳で開き、[環境変数](/docs/server/web-server/vars)を参考にして変数を書き込んで保存します。あくまで一例としてですが、`.env.local` ファイルは最終的に下のようになります。

```env
NEXT_PUBLIC_FIREBASE_CONFIG='{"apiKey":"****************","authDomain":"***-*****.firebaseapp.com","databaseURL":"https://***-*****.firebaseio.com","projectId":"***-*****","storageBucket":"***-*****.appspot.com","messagingSenderId":"**********","appId":"****************"}'
NEXT_PUBLIC_API_HTTP=https://example.com
NEXT_PUBLIC_API_WS=wss://example.com
NEXT_PUBLIC_AUTH_PROVIDERS=email,google
NEXT_PUBLIC_FIREBASE_STORAGE_ENABLED=true
```

`server/apps/web-server` フォルダ内で次のコマンドを実行して、必要なパッケージをインストールします。なお、これには合計1GB程度の空きストレージ容量が必要です。また、これには数分から十数分程度の時間がかかることがあります。

```bash
$ yarn workspaces focus
```

:::note
`yarn workspaces focus`の代わりに`yarn install`などを実行しても構いません。ですが`yarn install`ではAPIサーバーに必要なパッケージもインストールしようとするため、環境によっては [bcrypt](https://www.npmjs.com/package/bcrypt) パッケージなどのインストールに失敗します。そのため`yarn workspaces focus`のほうが無難だと思われます。
:::

次の2つのコマンドを順に実行して、静的ファイルを作成します。これには数分から十数分程度の時間がかかることがあります。

```bash
$ yarn run build
$ yarn run export
```

:::info
`yarn run build`を実行したときに`MODULE_NOT_FOUND`というエラーが出る場合は、パスに全角文字などが含まれていないかどうか確認してください。
:::

:::info
パスに全角文字が含まれる状態で`yarn workspaces focus`などを実行していた場合、`yarn run build`を実行すると`The command failed for workspaces that are depended upon by other workspaces; can't satisfy the dependency graph`というエラーが出て失敗することがあります。この場合は、パスに全角文字を含まないようにしてから`servers`フォルダにある`node_modules`フォルダを削除して、`yarn workspaces focus`を実行するところからやり直してください。
:::

:::note
`yarn run build`を実行すると`ESLint must be installed in order to run during builds: yarn add --dev eslint`というエラーが出ますが、無視して構いません。
:::

最終的に`out`フォルダが生成されます。この中にはHTMLファイル、画像ファイル、JavaScriptファイルなどといった静的ファイルが入っています。これをホスティングサービスなどにアップロードすることでWebサーバーの設置が完了します。

:::caution
生成された`out`フォルダと`.next`フォルダ内のファイルには、先ほど作成した `.env.local`ファイルの情報が埋め込まれています。そのため、これらのファイルを第三者と共有することは推奨されません。
:::

静的ファイルをアップロードするホスティングサービスはNetlifyやFirebase Hostingなど様々なものがありますが、ここではドラッグ&ドロップでデプロイできるNetlifyを用いる方法を解説します。

## Netlifyにデプロイする

[Netlify](https://www.netlify.com/)にアクセスして、アカウントを作成します。

作成したら、下にある`Drag and drop...`に`out`フォルダをドラッグ&ドロップします。

しばらくするとサイトが作成されるので、アクセスしてみて確認します。