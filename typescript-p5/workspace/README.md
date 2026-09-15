# 自分のプログラムを保存する場所

`workspace/` は、学生のみなさんが自分で作成したTypeScriptプログラムを保存するフォルダです。教材リポジトリの `typescript-p5/` の中にあり、`listings/` や `src/` と同じ階層にあります。この説明の `workspace/` は `typescript-p5/workspace/` を指します。

- 授業中の練習、試行錯誤、自由制作の `.ts` ファイルは、基本的にこのフォルダ以下へ保存します。たとえば `workspace/first-sketch.ts` のように、内容が分かる名前を付けます。
- 演習問題・課題のプログラムは、[exercises/](exercises/) に保存します。ファイル名は `02-01.ts` のように、章番号と問題番号をそれぞれ2桁で書きます。
- 教材本体の `typescript-p5/src/` や設定ファイルは、教材や担当教員の指示がある場合にだけ変更してください。`listings/` のサンプルを変更して作品を作る場合も、自分のプログラムは `workspace/` 以下へ保存します。

## 保存したプログラムを試すとき

実行するファイルは `typescript-p5/index.html` で指定します。`workspace/` に保存するだけでは選択されません。既存の `<script type="module" ...>` の `src` を、実行したいファイルへ変更してください。`script` 要素は増やしません。

```html
<script type="module" src="/workspace/exercises/02-01.ts"></script>
```

先頭の `/` は `typescript-p5/` を表します。`workspace/first-sketch.ts` なら `/workspace/first-sketch.ts` と書きます。作ったファイルを直接編集して保存し、`typescript-p5/` で `npm run dev` を動かしたままブラウザで確認します。`src/main.ts` へのコピーや同期は不要です。

サンプルをもとに作るときは、最初に元の内容全体をこのフォルダ以下の新しいファイルへコピーします。それ以降は、自分のファイルだけを編集します。画像・JSON・音声などの素材は、各章で指定された場所に置きます。相対パスで補助ファイルをimportしている場合は保存先に合わせた確認が必要です。第17章の音声サンプルは、`workspace/exercises/` 内なら同じ `../../src/p5-sound` を使えます。`workspace/` 直下に置く場合は `../src/p5-sound` にします。

`typescript-p5/` で `npm run check` を実行すると、`workspace/` 以下のTypeScriptファイルも型チェックされます。未完成の別の課題にエラーがある場合も表示されるので、メッセージ中のファイル名を確認しましょう。

作業の節目には、`workspace/` 以下のファイルと、実行先を変更した `index.html` をGitで記録します。提出方法は担当教員や学内LMSの指示に従ってください。
