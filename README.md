# TypeScript + p5.js プログラミング入門

このリポジトリは、大学などの初学者向けに作成した、TypeScriptとp5.jsによるプログラミング入門教材です。Windowsでの利用を基本とし、macOSとUbuntuでの準備方法も付録に収録しています。

## 学生のみなさんへ

最初に使う場所は次の3つです。

1. **教材PDF**: [GitHub Releases](https://github.com/m-riho/typescript-p5js-programming-textbook/releases/latest)
2. **プログラムを実行するプロジェクト**: [`typescript-p5/`](typescript-p5/)
3. **章ごとのサンプルプログラム**: [`listings/`](listings/)

環境構築と最初の実行手順は、教材PDFの第1章で詳しく説明しています。

自分で作成するTypeScriptファイルは [`workspace/`](workspace/) に、演習問題・課題のファイルは [`workspace/exercises/`](workspace/exercises/) に保存します。課題のファイル名は `02-01.ts` のように、章番号と問題番号をそれぞれ2桁にします。

## Windowsで始める最短手順

VS Code、Git、Node.jsをインストールしたあと、PowerShellで教材を取得します。

```powershell
git clone https://github.com/m-riho/typescript-p5js-programming-textbook.git
cd typescript-p5js-programming-textbook
```

VS Codeで `typescript-p5js-programming-textbook` フォルダを開き、統合ターミナルで次のコマンドを実行します。

```powershell
cd typescript-p5
npm install
npm run dev
```

ターミナルに表示されたURLをWebブラウザで開くと、プログラムを確認できます。最初に編集するファイルは [`typescript-p5/src/main.ts`](typescript-p5/src/main.ts) です。

## サンプルプログラムを試す

`listings/chapter02/`のように、章ごとのフォルダへサンプルプログラムを収録しています。試したい `.ts` ファイルの内容を `typescript-p5/src/main.ts` へコピーして保存すると、開発サーバを動かしたまま結果を確認できます。

自分で変更した `main.ts` の内容は、別のサンプルで上書きする前に `workspace/` 以下へコピーして保存してください。`workspace/` のファイルは保存しただけでは実行されません。試すときは、その内容全体を `typescript-p5/src/main.ts` へコピーして保存します。実行用の `main.ts` と保存先のファイルは自動では同期されないため、修正は保存先にも反映してください。

教材本体の `typescript-p5/src/` や設定ファイルは、教材や担当教員の指示がある場合にだけ変更します。ここで説明する `main.ts` の編集・コピーも、その指示の一つです。各サンプルの目的と操作方法は教材PDFの対応する章で説明しています。

## リポジトリの構成

| パス | 内容 |
|---|---|
| `typescript-p5/` | TypeScript + p5.jsを実行するViteプロジェクト |
| `typescript-p5/src/main.ts` | 実行時に編集する中心的なTypeScriptファイル |
| `typescript-p5/images/` | 教材で使用する画像ファイル |
| `listings/` | 章ごとのサンプルプログラム |
| `workspace/` | 自分で作成するTypeScriptプログラムの保存先 |
| `workspace/exercises/` | 演習問題・課題の保存先（例: `02-01.ts`） |
| `chapters/` | LuaLaTeXの章ファイル |
| `figures/` | 教材の図版 |
| `main.tex` | 教材全体を組版するLuaLaTeXの入口 |

## 教材PDFを組版する

PDFの利用だけであれば、GitHub Releasesから取得するのが簡単です。LuaLaTeXソースから組版する場合は、LuaLaTeX、latexmk、mintedが動作する環境で、リポジトリのルートから次を実行します。

```console
latexmk -lualatex -shell-escape main.tex
```

## ライセンス

- `listings/`と`typescript-p5/`のサンプルプログラム: [MIT License](LICENSE-CODE)
- 上記以外の本文、図版、文書、LuaLaTeXソース: [CC BY-NC-SA 4.0](LICENSE)

教材内の作者提供イラストも、教材資料の一部としてCC BY-NC-SA 4.0の対象です。

## 質問と授業上の連絡

履修中の質問、課題提出、授業上の連絡には、担当教員または学内LMSを利用してください。
