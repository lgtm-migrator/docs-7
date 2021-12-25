---
title: "Vercel"
sidebar_position: 2
---

# Vercelにデプロイする方法

（書きかけ）

`FRAMEWORK PRESET` が `Next.js` になっていることを確認します。

## Build & Development Settings

`Settings`の`Build & Development Settings`を次のように設定します。

![1.png](/img/docs/vercel/1.png)

| キー                  | 値                                     |
| --------------------- | -------------------------------------- |
| `BUILD COMMAND`       | `yarn --cwd apps/web-server build` |
| `OUTPUT DIRECTORY`    | `apps/web-server/.next`            |
| `INSTALL COMMAND`     | 変更しない                             |
| `DEVELOPMENT COMMAND` | `yarn --cwd apps/web-server next`  |

## Environmental Variables

| KEY                                    | VALUE | 必要性 |
| -------------------------------------- | ----- | ------ |
| `NEXT_PUBLIC_FIREBASE_CONFIG`          |       | 必須   |
| `NEXT_PUBLIC_API_HTTP`                 |       | 必須   |
| `NEXT_PUBLIC_API_WS`                   |       | 必須   |
| `NEXT_PUBLIC_AUTH_PROVIDERS`           |       | 必須   |
| `NEXT_PUBLIC_FIREBASE_STORAGE_ENABLED` |       | 任意   |
