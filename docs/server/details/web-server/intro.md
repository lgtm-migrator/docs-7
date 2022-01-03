---
sidebar_position: 1
---

# 設置方法について

FloconのWebサーバーはNext.jsを使用しているため、Vercelなどにデプロイできます。その一方で、Next.jsは静的なHTMLファイルなどをエクスポートできる機能があり、これを用いることでVercel以外の様々なホスティングサービスにデプロイすることもできます。

通常は、GitHubと連携してビルドさせたい場合はVercelなどに、連携せずに直接デプロイしたい場合は[リリース一覧](https://github.com/flocon-trpg/servers/releases)から`web-server-static.zip`を利用してデプロイするのが最も簡単だと思います。後者の方法は[チュートリアルのページ](/docs/server/tutorial/web_server)に解説があります。この解説ではNetlifyにデプロイしていますが、他のホスティングサービスにデプロイすることもできます。


