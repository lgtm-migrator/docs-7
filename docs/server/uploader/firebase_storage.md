---
title: "Firebase Storage版アップローダー"
sidebar_position: 2
---

## 設定方法

Firebaseの管理ページを開き、`Storage`から`始める`ボタンをクリックします。

![1.png](/img/docs/firebase-storage/1.png)

表示されるメッセージを読み、`次へ`や`完了`ボタンを押して作成します。`Cloud Storageのロケーション`ですが、このFirebaseプロジェクトをFlocon以外に使用しない場合は、日本からのアクセスが多いと予想される場合は`asia-northeast1`（東京）もしくは`asia-northeast2`（大阪）でいいと思われます。ただし、他の地域を選んでもそこまで大きくユーザー体験が損なわれることはないと考えられます。

`Storage`から`Rules`を選択して、セキュリティルールの編集を行います。

![4.png](/img/docs/firebase-storage/4.png)

:::caution
セキュリティルールの編集を行わない場合、事実上すべてのユーザーが自由にファイルを取得、アップロード、編集、削除できてしまいます。そのため最低限のセキュリティルールの設定を行うことを推奨します。
:::

## セキュリティルール設定例1

次のセキュリティルールを適用することで、「ファイル名がわからない限りファイルをダウンロードできない」という制限をかけることができます。

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /version/1/uploader/unlisted/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid==userId;
    }
    match /version/1/uploader/unlisted/{allPaths=**} {
      allow get: if request.auth!=null;
    }
  }
}
```

このセキュリティルールは次のように働きます。

- ログインしていないユーザーはファイルのダウンロード、アップロード、編集、削除は一切できない
- ログインしている全てのユーザーはファイルのアップロードが可能
- ファイルの名前とアップロードしたユーザーのUIDがわかっている場合、ログインしている全てのユーザーがそのファイルをダウンロード可能
- ファイル名一覧は、自分がアップロードしたものしか取得できない

なお、この文章における"ログインしている全てのユーザー"は、エントリーしていないユーザーも含みます。アップロードを一部のユーザーだけに制限したい場合は、例えば次のように許可リスト方式で設定できます。

## セキュリティルール設定例2

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
  	function isPermittedUser(requestAuthUid) {
    	// アップロードを許可するユーザーUIDを入力します。この例ではユーザーUIDが qweRTYuioP123, asdFGHjkl456, zxcVBNnm7890 のいずれかのユーザーのみにアップロードを許可します。
        let permittedUsers = [
      	"qweRTYuioP123",
        "asdFGHjkl456",
        "zxcVBNnm7890"
      ];

    	return requestAuthUid in permittedUsers;
    }
    match /version/1/uploader/unlisted/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid==userId && isPermittedUser(request.auth.uid);
    }
    match /version/1/uploader/unlisted/{allPaths=**} {
      allow get: if request.auth!=null;
    }
  }
}
```

これらの他にも、[Firebaseの解説サイト](https://firebase.google.com/docs/rules?hl=ja)を参考にして、独自にカスタマイズしたセキュリティルールを用いても構いません。

## 管理者によるファイルの追加、変更、削除

Firebaseの管理ページから`Storage`をクリックして`Files`を選択することで表示できるファイル一覧から直接ファイルを追加、変更、削除してもアップローダーの動作に支障はありません。なお当然ですが、削除されたファイルはアップローダーから利用できなくなります。