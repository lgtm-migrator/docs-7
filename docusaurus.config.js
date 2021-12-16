// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Flocon",
  tagline: "個人サーバーで使えるTRPGオンラインセッションツール（β）",
  url: "https://flocon.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",
  organizationName: "kizahasi",
  projectName: "flocon",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/flocon-trpg/servers/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/flocon-trpg/servers/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark'
      },
      navbar: {
        title: "Flocon",
        logo: {
          alt: "Flocon Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "ドキュメント",
          },
          {
            href: "https://github.com/flocon-trpg/servers",
            label: "ダウンロード",
            position: "left",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/flocon-trpg/servers",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: "Community",
          //   items: [
          //     {
          //       label: "Discord",
          //       href: "https://discordapp.com/invite/docusaurus",
          //     },
          //     {
          //       label: "Twitter",
          //       href: "https://twitter.com/docusaurus",
          //     },
          //   ],
          // },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/flocon-trpg/servers",
              },
              {
                label: "GitHub（ドキュメント）",
                href: "https://github.com/flocon-trpg/docs",
              },
              {
                label: "Discord",
                href: "https://discord.gg/TYubGvYuQu"
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} kizahasi`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      i18n: {
        defaultLocale: "ja",
        locales: ["ja"],
      },
    }),
};

module.exports = config;
