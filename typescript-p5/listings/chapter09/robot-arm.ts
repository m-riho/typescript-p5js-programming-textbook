// p5.jsの機能を取り込む
import p5 from "p5";
// p5.js全体の処理をまとめる関数
const sketch = (p: p5): void => {
    let baseAngle: number = 0; // 腕全体の回転角度
    p.setup = (): void => {
        p.createCanvas(420, 320);
        p.rectMode(p.CENTER);
    };
    p.draw = (): void => {
        p.background(245);
        // 腕の根元を中心に置き、先端へ原点を移しながら描く
        p.translate(p.width / 2, p.height / 2);
        p.rotate(baseAngle);
        drawArmSegment(p, 110, 24, p.color(230, 90, 80));
        p.translate(110, 0);
        p.rotate(baseAngle * 1.7);
        drawJoint(p);
        drawArmSegment(p, 80, 20, p.color(90, 170, 120));
        p.translate(80, 0);
        p.rotate(baseAngle * 2.3);
        drawJoint(p);
        drawArmSegment(p, 55, 16, p.color(80, 130, 220));
        baseAngle = baseAngle + 0.015;
    };
};
// 原点から右方向へ伸びる腕の部品を描く
function drawArmSegment(p: p5, segmentLength: number,
    segmentWidth: number, segmentColor: p5.Color
): void {
    p.fill(segmentColor);
    p.stroke(45);
    p.rect(segmentLength / 2, 0, segmentLength, segmentWidth);
}
// 腕のつなぎ目を描く
function drawJoint(p: p5): void {
    p.fill(250);
    p.stroke(45);
    p.circle(0, 0, 28);
}

new p5(sketch);
