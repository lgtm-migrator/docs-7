---
sidebar_position: 1
---

# はじめに

## コンセプト

Floconを動作させるには、[Firebase]、APIサーバー、Webサーバーの3つのセットアップが原則として必要です。

![構成](/img/docs/servers-min.png)

:::tip
画像ではWebサーバーとAPIサーバーが独立していますが、実際はこれら2つのプログラムは1つのサーバー上で同時に動かすことも可能です。そのため、Floconサイトを構築する際に、必ずしもサーバーを2つ以上用意する必要はありません。
:::

### Webサーバー (必須)

Webサーバーは、HTMLファイル、JavaScriptファイル、CSSファイルなどの静的ファイルを各ブラウザに配信します。これらには現在の部屋の状態などといった動的なデータは含まれていません。動的なデータはAPIサーバーから送信されます。

### APIサーバー (必須)

APIサーバーの主な役割は、部屋データなどといった動的に変わるデータを保存、管理し、ブラウザと通信することです。

### Firebase

[Firebase]は、Googleが提供している、Webサイトの運用に役立つサービスプラットフォームです。FloconはFirebaseを利用して作られています。

Firebaseは複数のサービスから構成されていますが、そのうちFloconが対応しているサービスは、Firebase AuthenticationとFirebase Storageの2つです。

[firebase]: https://firebase.google.com/?hl=ja

