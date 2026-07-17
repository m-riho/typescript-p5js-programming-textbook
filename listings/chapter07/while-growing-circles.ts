// p5.jsの機能を取り込む
import p5 from "p5";

// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    // 最初に一度だけ実行される処理
    p.setup = (): void => {
        // キャンバスを作り、背景を明るい灰色で塗る
        p.createCanvas(320, 240);
        p.background(245);

        const centerX: number = p.width / 2; // 円の中心の x 座標
        const centerY: number = p.height / 2; // 円の中心の y 座標
        let circleDiameter: number = 30; // 現在描く円の直径
        const diameterStep: number = 28; // 直径を増やす量

        // 塗りつぶさない円を描く
        p.noFill();
        p.stroke(40);

        // 直径を大きくしながら、同じ中心に円を描く
        while (circleDiameter <= 210) {
            p.circle(centerX, centerY, circleDiameter);

            // 次に描く円の直径に進める
            circleDiameter = circleDiameter + diameterStep;
        }
    };
};

new p5(sketch);
