// p5.jsの機能を取り込む
import p5 from "p5";

class Character {
    // キャラクターの名前
    name: string;
    // 体力
    hitPoint: number;
    // 画面上の中心 x 座標
    centerX: number;
    // 画面上の中心 y 座標
    centerY: number;

    constructor(
        name: string,
        hitPoint: number,
        centerX: number,
        centerY: number
    ) {
        // すべてのキャラクターに共通する状態を初期化する
        this.name = name;
        this.hitPoint = hitPoint;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    attack(): string {
        // 子クラスで上書きされない場合の基本の行動
        return this.name + "は攻撃した";
    }

    magic(): string {
        return this.name + "は魔法を使えない";
    }

    heal(): string {
        return this.name + "は回復できない";
    }

    display(p: p5): void {
        p.fill(245);
        p.stroke(60);
        p.circle(this.centerX, this.centerY, 42);

        p.fill(40);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(this.name, this.centerX, this.centerY + 36);
        p.text("HP " + this.hitPoint, this.centerX, this.centerY + 54);
    }
}

class Hero extends Character {
    attack(): string {
        return this.name + "は剣で攻撃した";
    }

    heal(): string {
        return this.name + "は薬草で回復した";
    }
}

class Mage extends Character {
    magic(): string {
        return this.name + "は炎の魔法を使った";
    }

    heal(): string {
        return this.name + "は回復魔法を使った";
    }
}

class Knight extends Character {
    attack(): string {
        return this.name + "は重い一撃を放った";
    }
}

class Monster extends Character {
    attack(): string {
        return this.name + "は体当たりした";
    }
}

class GroundMonster extends Monster {
    attack(): string {
        return this.name + "は地面を走って攻撃した";
    }
}

class Slime extends GroundMonster {
    attack(): string {
        return this.name + "はぷるぷる体当たりした";
    }
}

class Goblin extends GroundMonster {
    attack(): string {
        return this.name + "は小さな棍棒で攻撃した";
    }
}

class FlyingMonster extends Monster {
    attack(): string {
        return this.name + "は空から急降下した";
    }
}

class Bat extends FlyingMonster {
    attack(): string {
        return this.name + "は羽ばたいて攻撃した";
    }
}

class Drone extends FlyingMonster {
    attack(): string {
        return this.name + "はレーザーを撃った";
    }
}

class BossMonster extends Monster {
    magic(): string {
        return this.name + "は強力な魔法をためている";
    }
}

class Dragon extends BossMonster {
    attack(): string {
        return this.name + "は炎の息を吐いた";
    }

    magic(): string {
        return this.name + "は竜の魔法を使った";
    }
}

const sketch = (p: p5): void => {
    // パーティとモンスターをまとめて入れる配列
    const characters: Character[] = [];

    p.setup = (): void => {
        p.createCanvas(760, 360);
        p.noLoop();
        p.textSize(13);

        // Character型の配列に、さまざまな子クラスを入れる
        characters[0] = new Hero("Hero", 120, 70, 80);
        characters[1] = new Mage("Mage", 80, 170, 80);
        characters[2] = new Knight("Knight", 150, 270, 80);
        characters[3] = new Slime("Slime", 30, 70, 210);
        characters[4] = new Goblin("Goblin", 50, 170, 210);
        characters[5] = new Bat("Bat", 35, 270, 210);
        characters[6] = new Drone("Drone", 60, 370, 210);
        characters[7] = new Dragon("Dragon", 300, 470, 210);
    };

    p.draw = (): void => {
        p.background(245);

        // どの子クラスでも、Characterとしてdisplayを呼び出せる
        for (let index: number = 0; index < characters.length; index++) {
            characters[index].display(p);
        }

        displayActionLog(p, characters);
    };
};

function displayActionLog(p: p5, characters: Character[]): void {
    // 行動ログを表示する x 座標
    const logX: number = 540;

    p.fill(40);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);

    p.text(characters[0].attack(), logX, 30);
    p.text(characters[1].magic(), logX, 50);
    p.text(characters[1].heal(), logX, 70);
    p.text(characters[3].attack(), logX, 110);
    p.text(characters[5].attack(), logX, 130);
    p.text(characters[7].attack(), logX, 150);
    p.text(characters[7].magic(), logX, 170);
}

new p5(sketch);
