---
sidebar_position: 2
---

# Firebase Authentication のセットアップ

[Firebase公式ページ]にアクセスして、「使ってみる」から Firebase プロジェクトを作成します。

## プロジェクトの作成

サイトの説明に従って、新しい Firebase プロジェクトを作るか、既存のプロジェクトを選択して続行を押します。

![1.png](/img/docs/firebase-auth/1.png)

<hr />

Google アナリティクスを有効にするかどうかを選択します。特にデータが必要でない限りは基本的には無効でいいと思います。

![2.png](/img/docs/firebase-auth/2.png)

<hr />

プロジェクトの作成が完了したら、Firebase 設定画面のトップページに自動的に移動します。

## Firebase Authentication の設定

Firebase Authentication の設定を行います。左上にある「Authentication」を選択して、「始める」ボタンを押します。

![3.png](/img/docs/firebase-auth/3.png)

<hr />

「Sign-in method」を選択して、「ログインプロバイダ」から希望するログイン方法を追加します。最低でも 1 つのログイン方法を追加しないと利用者がログインできないので、少なくとも 1 つは追加する必要があります。

簡単にセットアップできるものでおすすめなのは、「メール/パスワード」と「Google」です。

ログイン方法は後からでも追加および削除が可能です。

![4.png](/img/docs/firebase-auth/4.png)

### 自動的に送信されるメールのタイトルと本文を変更 (任意)

ユーザーがパスワード再発行などを希望したときは Firebase からそのユーザーに対して自動的にメールが配信されます。このメールのタイトルと本文はデフォルトでは英語ですが、「Templates」からこれらを変更することもできます。

![6.png](/img/docs/firebase-auth/6.png)


[firebase公式ページ]: https://firebase.google.com/?hl=ja
