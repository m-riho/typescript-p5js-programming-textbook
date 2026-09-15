// p5.jsの機能を取り込む
import p5 from "p5";

/**
 * 目を描く。
 *
 * @param p p5.jsの機能を利用するためのオブジェクト
 * @param x 目の中心のx座標
 * @param y 目の中心のy座標
 * @param r 目の大きさの基準となる値
 */
function drawEye(
    p: p5,
    x: number,
    y: number,
    r: number
): void {
    // 図形の輪郭線を描かない
    p.noStroke();

    // 目の外側を描く
    // 横幅はrの2倍、縦幅はrの2.5倍
    p.fill(255, 70, 110);
    p.ellipse(x, y, r * 2, r * 2.5);

    // 瞳を描く
    p.fill(150, 0, 30);
    p.ellipse(x, y, r * 0.7, r * 1.6);

    // 瞳のハイライトを描く
    // 目の中心より少し左上に白い円を配置する
    p.fill(255);
    p.ellipse(
        x - r * 0.25,
        y - r * 0.45,
        r * 0.45,
        r * 0.45
    );
}

/**
 * 口を描く。
 *
 * 2つの円弧を横に並べて口を描く。
 *
 * @param p p5.jsの機能を利用するためのオブジェクト
 * @param x 口全体の中心のx座標
 * @param y 口の中心のy座標
 * @param w 口の片側の幅
 * @param h 口の高さ
 */
function drawMouth(
    p: p5,
    x: number,
    y: number,
    w: number,
    h: number
): void {
    // 円弧の内側を塗りつぶさない
    p.noFill();

    // 口の線を濃い灰色にする
    p.stroke(60);

    // 口の線の太さを3ピクセルにする
    p.strokeWeight(3);

    // 口の左半分を描く
    p.arc(
        x - w / 2,
        y,
        w,
        h,
        0,
        p.PI
    );

    // 口の右半分を描く
    p.arc(
        x + w / 2,
        y,
        w,
        h,
        0,
        p.PI
    );
}

/**
 * 額の模様を描く。
 *
 * 楕円と三角形を組み合わせて模様を作る。
 *
 * @param p p5.jsの機能を利用するためのオブジェクト
 * @param x 模様の中心のx座標
 * @param y 模様の上側の中心のy座標
 * @param w 模様の幅
 * @param h 模様の高さ
 */
function drawMark(
    p: p5,
    x: number,
    y: number,
    w: number,
    h: number
): void {
    // 模様の輪郭線を描かない
    p.noStroke();

    // 模様を赤みのある色で塗る
    p.fill(255, 70, 110);

    // 模様の上側を楕円で描く
    p.ellipse(x, y, w, h);

    // 模様の下側を三角形で描く
    p.triangle(
        x - w * 0.3,
        y,
        x + w * 0.3,
        y,
        x,
        y + h
    );
}

/**
 * 顔全体を描く。
 *
 * 顔、頬、額の模様、目、口を組み合わせて、
 * 1つの顔を描く。
 *
 * @param p p5.jsの機能を利用するためのオブジェクト
 * @param x 顔の中心のx座標
 * @param y 顔の中心のy座標
 * @param w 顔の横幅
 * @param h 顔の縦幅
 */
function drawKyubeyFace(
    p: p5,
    x: number,
    y: number,
    w: number,
    h: number
): void {
    // 顔の輪郭線を描かない
    p.noStroke();

    // 顔を白色で塗る
    p.fill(255);

    // 顔の中心部分を大きな楕円で描く
    p.ellipse(x, y, w, h);

    // 左の頬を描く
    p.ellipse(
        x - w * 0.25,
        y + h * 0.23,
        w * 0.55,
        h * 0.45
    );

    // 右の頬を描く
    p.ellipse(
        x + w * 0.25,
        y + h * 0.23,
        w * 0.55,
        h * 0.45
    );

    // 額の模様を描く
    drawMark(
        p,
        x,
        y - h * 0.3,
        w * 0.12,
        h * 0.09
    );

    // 左目を描く
    drawEye(
        p,
        x - w * 0.23,
        y - h * 0.05,
        w * 0.1
    );

    // 右目を描く
    drawEye(
        p,
        x + w * 0.23,
        y - h * 0.05,
        w * 0.1
    );

    // 口を描く
    drawMouth(
        p,
        x,
        y + h * 0.25,
        w * 0.1,
        h * 0.08
    );
}

/**
 * マウスカーソルが口の範囲内にあるかを調べる。
 *
 * @param mouseX マウスカーソルのx座標
 * @param mouseY マウスカーソルのy座標
 * @param mouthCenterX 口の中心のx座標
 * @param mouthCenterY 口の中心のy座標
 * @param mouthWidth 口を囲む判定範囲の幅
 * @param mouthHeight 口を囲む判定範囲の高さ
 * @returns 口の範囲内にあるときはtrue、範囲外にあるときはfalse
 */
function isMouseOverMouth(
    mouseX: number,
    mouseY: number,
    mouthCenterX: number,
    mouthCenterY: number,
    mouthWidth: number,
    mouthHeight: number
): boolean {
    // マウスカーソルが口の左右の範囲内にあるか
    const isInsideHorizontally: boolean =
        mouseX >= mouthCenterX - mouthWidth / 2 &&
        mouseX <= mouthCenterX + mouthWidth / 2;

    // マウスカーソルが口の上下の範囲内にあるか
    const isInsideVertically: boolean =
        mouseY >= mouthCenterY - mouthHeight / 2 &&
        mouseY <= mouthCenterY + mouthHeight / 2;

    return isInsideHorizontally && isInsideVertically;
}

/**
 * p5.jsのプログラム全体を定義する。
 *
 * @param p p5.jsの機能を利用するためのオブジェクト
 */
function sketch(p: p5): void {
    // 顔の中心のx座標
    const faceCenterX: number = 300;

    // 顔の中心のy座標
    const faceCenterY: number = 250;

    // 顔の横幅
    const faceWidth: number = 380;

    // 顔の縦幅
    const faceHeight: number = 300;

    /**
     * プログラムの実行開始時に1回だけ実行される。
     */
    p.setup = (): void => {
        // 幅600ピクセル、高さ500ピクセルの
        // キャンバスを作成する
        p.createCanvas(600, 500);
    };

    /**
     * キャンバスに絵を描く。
     */
    p.draw = (): void => {
        // 背景を薄い青色で塗る
        p.background(235, 240, 250);

        // キャンバスの中央に顔を描く
        drawKyubeyFace(
            p,
            faceCenterX,
            faceCenterY,
            faceWidth,
            faceHeight
        );

        // 口の中心と判定範囲を顔の大きさから計算する
        const mouthCenterX: number = faceCenterX;
        const mouthCenterY: number = faceCenterY + faceHeight * 0.25;
        const mouthHitAreaWidth: number = faceWidth * 0.2;
        const mouthHitAreaHeight: number = faceHeight * 0.12;

        const mouseIsOverMouth: boolean = isMouseOverMouth(
            p.mouseX,
            p.mouseY,
            mouthCenterX,
            mouthCenterY,
            mouthHitAreaWidth,
            mouthHitAreaHeight
        );

        if (mouseIsOverMouth) {
            // 口の上にマウスがあるときだけ自己紹介を表示する
            p.noStroke();
            p.fill(60);
            p.textSize(20);
            p.text("I'm Kyubey.", p.mouseX, p.mouseY);
        }
    };
}

// 上で定義したsketchを使ってp5.jsを実行する
new p5(sketch);
