---
title: "Heroku以外"
sidebar_position: 3
---

# Heroku以外でセットアップする方法

このページでは、Heroku以外の一般的なAPIサーバーのセットアップする方法について説明します。

:::info
現時点では解説は用意できていませんが、Dockerを用いてセットアップすることも可能です。FloconのDockerイメージは[Docker Hub](https://hub.docker.com/repository/docker/kizahasi/flocon-api)もしくは[GitHubリポジトリにあるDockerfile](https://github.com/flocon-trpg/servers/tree/main/docker)から入手できます。
:::

## 必要環境

OSはUbuntu Server 20.04 x64で動作確認しています。他のLinuxディストリビューションや、Windows、macOSでもおそらく動くと思いますが、[bcrypt](https://github.com/kelektiv/node.bcrypt.js#nodebcryptjs)パッケージなどの影響で追加の作業が必要になる可能性があります。

APIサーバーの稼働自体はGoogle Compute EngineのE2-micro程度のスペックでも可能ですが、npmパッケージのインストールおよびビルドにはスワップ領域込みでメモリ3～4GB程度が必要なようです。そのため、Google Compute EngineやAmazon EC2などのようにサーバーのスペックを自由に切り替えられるサービスを利用している場合は、インストールおよびビルドのときにのみスペックを一時的に上げるか、Dockerイメージを用いることを推奨します。

## セットアップ方法

ここで解説する作業はサーバー上で行ってください。

Node.js 16もしくは14をインストールしてください。インストールが完了したら、下のコマンドを実行してインストールできているか確認します。

```console
$ node --version
```

また、npmもインストールできているかどうかを次のコマンドで確認します。通常はNode.jsと一緒にインストールされます。

```console
$ npm --version
```

次のコマンドでyarnをインストールします。

```console
$ npm install -g yarn
```

:::note
Floconはnpmやpnpmには対応していないため、yarnは必須です。
:::

必要であれば、APIサーバーのソースコードをダウンロードするディレクトリに移動します。

APIサーバーのソースコードをダウンロードします。様々な方法がありますが、ここでは `git clone` を用いてダウンロードする方法を解説します。下のコマンドを実行してGitHubからソースコードをダウンロードします。なお、この例では `-b` には `release` ブランチを指定していますが、代わりにタグを指定することもできます。

```console
$ git clone https://github.com/flocon-trpg/servers.git -b release --depth 1
```

:::note
`main`ブランチは開発用ブランチであるため、開発者以外の利用は推奨されません。
:::

ダウンロードが完了したら、`servers/apps/api-server` に移動します。

```console
$ cd servers/apps/api-server
```

次のコマンドを実行して、必要なnpmパッケージをインストールします。なお、これには合計600MB程度のストレージ空き容量が必要です。また、これには数分から十数分程度の時間がかかることがあります。

```console
$ yarn workspaces focus 
```

:::note
`yarn workspaces focus` の代わりに `yarn install` を実行しても構いません。
:::

次のコマンドを実行して、ソースコードをビルドします。なお、これには数分から十数分程度の時間がかかることがあります。もし長時間（30分～1時間程度）経っても終わらない場合は、ビルドを中止してサーバーのスペックを上げることを検討してください。

```console
$ yarn run build 
```

`servers/apps/api-server`フォルダ内に`.env.local` ファイルを作成して、[環境変数](../vars)を参照してAPIサーバーの設定情報を入力して保存します。

手動でデータベースのマイグレーションを行う場合は、次のコマンドを実行します（自動マイグレーションを有効化している場合はこの作業は必要ありません）。

```console
$ yarn run migration-up
```

次のコマンドを実行して、サーバーが正常に稼働するかどうか確認します。

```
$ yarn run start
```

ブラウザからAPIサーバーの動作を確認する場合、例えばAPIサーバーのURLが `http://example.com` であれば、`http://example.com/graphql` にアクセスします。Apollo Server のページ（夜空のような背景）が表示されていればおそらく成功です。

これでAPIサーバーの導入は完了です。

なお、通常はsystemctlなどを用いてAPIサーバープログラムを自動的に起動させるようにすると思いますが、その設定に関してはここでは解説しません。

また、Certbotなどを使用して常時SSL化することも推奨します。