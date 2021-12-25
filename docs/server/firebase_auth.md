---
title: "Firebase Authentication のセットアップ"
sidebar_position: 3
---

export const Space = () => (<div style={{ height: 12 }} />);

[Firebase公式ページ]にアクセスして、「使ってみる」から Firebase プロジェクトを作成します。

## プロジェクトの作成

サイトの説明に従って、新しいプロジェクトを作るか、既存のプロジェクトを選択して続行を押します。

![1.png](/img/docs/firebase-auth/1.png)

:::danger
プロジェクトにGoogle Cloudの請求先アカウントの設定などを行った場合は、[Firebaseのプランが無料のSparkプランではなく従量課金制のBlazeプランに自動的にアップグレードされる](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans#upgrade-spark-to-blaze)ことがあります。FirebaseのBlazeプランはGoogle Cloudと同じく課金額の上限を直接的に制限できないため、多額の料金を請求されるリスクがあります。確実にSparkプランに固定したい場合は、請求先アカウントが設定されていないプロジェクトを使用し、そのプロジェクトに請求先アカウントを今後設定しないようにしてください。Blazeプランを使用する場合は、課金アラートの設定などを行うことを強く推奨します。

よくわからない場合は、以下の点を守ることを推奨します。

- Sparkプランを利用する。
- FirebaseやGoogle Cloudなどで、請求先（クレジットカードの登録など）を設定しない。
- 既存のGoogle Cloudプロジェクトがある場合は、それとは別にFlocon用のプロジェクトを作ったほうが無難（Blazeプランを利用することを考えていて、請求先アカウントを一元的に管理したい場合などはこの限りではありません）。
:::

<Space />

Google アナリティクスを有効にするかどうかを選択します。特にデータが必要でない限りは基本的には無効でいいと思います。

![2.png](/img/docs/firebase-auth/2.png)

<Space />

プロジェクトの作成が完了したら、Firebase 設定画面のトップページに自動的に移動します。

## Firebase Authentication の設定

Firebase Authentication の設定を行います。左上にある「Authentication」を選択して、「始める」ボタンを押します。

![3.png](/img/docs/firebase-auth/3.png)

<Space />

「Sign-in method」を選択して、「ログインプロバイダ」から希望するログイン方法を追加します。最低でも 1 つのログイン方法を追加しないと利用者がログインできないので、少なくとも 1 つは追加する必要があります。

2021/12/26現在、Floconが対応しているのは「メール/パスワード」「電話番号」「匿名」「Google」「Facebook」「Twitter」「GitHub」です。このうち簡単にセットアップできるものでおすすめなのは、「メール/パスワード」と「Google」です。サーバーの用途によっては「匿名」も有効化してもいいかもしれません。

ログイン方法は後からでも追加および削除が可能です。

![4.png](/img/docs/firebase-auth/4.png)

### 自動的に送信されるメールのタイトルと本文を変更 (任意)

:::info
この項目の作業は任意です。
:::

ユーザーがパスワード再発行などを希望したときは Firebase からそのユーザーに対して自動的にメールが配信されます。このメールのタイトルと本文はデフォルトでは英語ですが、左下にある「テンプレート言語」などからこれらを変更することもできます。

デフォルトの文章はFloconに関するメールだということが少し分かりにくいですし、英語のメールだとユーザーに迷惑メールなどと誤解される可能性があるため、公開サーバーを運用する場合は変更したほうがいいかもしれません。

![6.png](/img/docs/firebase-auth/6.png)

[firebase公式ページ]: https://firebase.google.com/?hl=ja
