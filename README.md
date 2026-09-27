# TypeScript + p5.js プログラミング入門

このリポジトリは、大学などの初学者向けに作成した、TypeScriptとp5.jsによるプログラミング入門教材です。Windowsでの利用を基本とし、macOSとUbuntuでの準備方法も付録に収録しています。

学生が使うサンプルプログラムと実行環境を配付しています。教材PDFはReleaseから取得します。LaTeXソースなどの編集用資料は、[教員向けリポジトリ](https://github.com/m-riho/typescript-p5js-programming-textbook-dev)で公開しています。

## 学生のみなさんへ

最初に使う場所は次の3つです。

1. **教材PDF**: [GitHub Releases](https://github.com/m-riho/typescript-p5js-programming-textbook/releases/latest)
2. **プログラムを実行するプロジェクト**: [`typescript-p5/`](typescript-p5/)
3. **章ごとのサンプルプログラム**: [`typescript-p5/listings/`](typescript-p5/listings/)

環境構築と最初の実行手順は、教材PDFの第1章で詳しく説明しています。

自分で作成するTypeScriptファイルは [`typescript-p5/workspace/`](typescript-p5/workspace/) に、演習問題・課題のファイルは [`typescript-p5/workspace/exercises/`](typescript-p5/workspace/exercises/) に保存します。課題のファイル名は `02-01.ts` のように、章番号と問題番号をそれぞれ2桁にします。

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

ターミナルに表示されたURLをWebブラウザで開くと、プログラムを確認できます。配布時は `typescript-p5/listings/chapter01/first-sketch.ts` が実行されます。

## サンプルプログラムを試す

`typescript-p5/index.html` の、次の行の `src` を試したいファイルに変更して保存します。`script` 要素は増やさず、既存の1行を書き換えてください。

```html
<script type="module" src="/listings/chapter02/points-and-lines.ts"></script>
```

先頭の `/` はViteの公開ルート `typescript-p5/` を表します。ここに `typescript-p5/` を重ねて書く必要はありません。通常はサーバを再起動せずに表示が更新されます。画像・JSON・音声の素材も、各章で指定された場所に用意してください。

自分で変更するときは、元のサンプルを一度 `typescript-p5/workspace/` 以下へ複製します。たとえば課題ファイルを `typescript-p5/workspace/exercises/02-01.ts` に作ったら、`src` を `/workspace/exercises/02-01.ts` にします。以降はその課題ファイルを直接編集して保存します。`src/main.ts` へのコピーや同期は不要です。

`typescript-p5/` で `npm run check` を実行すると、型の間違いを確認できます。開発サーバはTypeScriptを変換して実行しますが、型チェックは別の処理です。`npm run build` も型チェックを行ってからビルドします。未完成の課題にエラーがあるとチェックは止まりますが、`npm run dev` による実行は別に行えます。

一部の掲載ファイルは説明途中のコード片で、単独では実行できません。コンソールにだけ結果を表示する例もあります。[サンプル一覧の注意事項](typescript-p5/listings/README.md)を確認してください。教材本体の `src/` や設定ファイルは、教材・担当教員の指示がある場合にだけ変更します。`index.html` の実行先を変更する操作は、このREADMEで指示する操作です。

## リポジトリの構成

| パス | 内容 |
|---|---|
| `typescript-p5/` | TypeScript + p5.jsを実行するViteプロジェクト |
| `typescript-p5/src/main.ts` | 以前の実行用ファイル。`/src/main.ts` を指定すれば実行可能 |
| `typescript-p5/images/` | 教材で使用する画像ファイル |
| `typescript-p5/listings/` | 章ごとのサンプルプログラム |
| `typescript-p5/workspace/` | 自分で作成するTypeScriptプログラムの保存先 |
| `typescript-p5/workspace/exercises/` | 演習問題・課題の保存先（例: `02-01.ts`） |

## 以前の版を利用している方へ

v1.1.006から、学生向けリポジトリの最新ファイル一覧にはLaTeXソースや本文用図版を含めません。`typescript-p5/` 内の構成と実行方法は変わりません。旧版の履歴・タグ・Releaseは残しているため、過去の版を参照すると編集用資料が含まれます。

すでに教材を取得済みの場合、自分の課題や `index.html` の変更を退避・記録してから更新してください。更新時に競合が出た場合は、強制的なリセットやファイル削除をせず担当者へ相談します。別のフォルダに新しく取得し、自分の `workspace/` を確認しながら引き継ぐ方法もあります。

教材の本文やサンプルへの修正提案は、[教員向けリポジトリ](https://github.com/m-riho/typescript-p5js-programming-textbook-dev)へお願いします。この学生向けリポジトリは、確認済みの教材から配付用ファイルを生成して更新します。

## ライセンス

- `typescript-p5/`内のサンプルプログラム: [MIT License](LICENSE-CODE)
- 教材PDF、図版、READMEなどの文書: [CC BY-NC-SA 4.0](LICENSE)

教材内の作者提供イラストも、教材資料の一部としてCC BY-NC-SA 4.0の対象です。

## 質問と授業上の連絡

履修中の質問、課題提出、授業上の連絡には、担当教員または学内LMSを利用してください。
