# サンプルプログラムを実行する

このフォルダは `typescript-p5/listings/` です。PDFのキャプションにある `chapter02/points-and-lines.ts` は、このフォルダからのパスを表します。第19章・第20章には、章を追加する前のディレクトリ名 `chapter18/`・`chapter19/` を使っている例があります。章番号から推測せず、キャプションのパスを使ってください。

`typescript-p5/index.html` にある既存のmodule scriptの `src` を変更して保存します。script要素を追加する必要はありません。

```html
<script type="module" src="/listings/chapter02/points-and-lines.ts"></script>
```

`typescript-p5/` で `npm run dev` を実行し、表示されたURLを開きます。画像・JSON・音声は各章の指定場所に置きます。自分で改変する場合は、元のファイルを `../workspace/` 以下へ複製して、実行先もそのファイルに変更します。

## 単独では実行しない説明用ファイル

次の8ファイルは、関数やクラスの説明、またはほかの定義と組み合わせるためのコード片です。単独で選んでも画面は表示されないか、未定義の名前によるエラーになります。`complete-leaf-game.ts` も名前に反して単独実行用ではなく、本文で組み合わせ方を説明するスケッチ部分です。

- `chapter18/life-game-rules.ts`
- `chapter18/life-game-changed-cells.ts`
- `chapter19/collectible-interface.ts`
- `chapter19/interface-without-vector.ts`
- `chapter19/polymorphism-items.ts`
- `chapter19/polymorphism-sketch.ts`
- `chapter19/harmful-item.ts`
- `chapter19/complete-leaf-game.ts`

第19章のライフゲームを動かす場合は `chapter18/basic-life-game.ts`、`chapter18/life-game-full-scan.ts`、`chapter18/life-game-optimized.ts`、`chapter18/life-game-comparison.ts` を使えます。第20章の導入例は `chapter19/single-leaf.ts` と `chapter19/leaf-class.ts` を使えます。

## コンソールに結果を表示する例

次の4ファイルは画面に図形を描きません。ブラウザの開発者ツールの「Console」で結果を確認します。

- `chapter18-iteration/push-pop-stack.ts`
- `chapter18-iteration/shift-unshift-queue.ts`
- `chapter18-iteration/for-in-array.ts`
- `chapter18-iteration/for-in-object.ts`

## 型チェック

`typescript-p5/` で `npm run check` を実行すると、`src/`、`workspace/` と単独実行用サンプルを検査します。上記の説明用ファイル8件は、必要な定義がそろわないためサンプル側の検査から除外しています。サンプル側では、教材で共通の形を説明するための未使用の変数・仮引数をエラーにしません。型の不一致などは検査します。
