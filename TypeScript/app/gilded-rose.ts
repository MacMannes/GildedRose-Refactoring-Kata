export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    update() {
        if (this.isAgedBrie() || this.isBackstagePass()) {
            const amount = this.computeAmountToIncreaseQuality();
            this.increaseQuality(amount);
        } else {
            this.decreaseQuality();
        }

        if (!this.isSulfuras()) {
            this.sellIn = this.sellIn - 1;
        }
        if (this.sellIn < 0) {
            if (this.isAgedBrie()) {
                this.increaseQuality();
            } else {
                if (this.isBackstagePass()) {
                    this.quality = 0;
                } else {
                    this.decreaseQuality();
                }
            }
        }
    }

    private computeAmountToIncreaseQuality(): number {
        if (this.isBackstagePass() && this.sellIn < 6) return 3;
        if (this.isBackstagePass() && this.sellIn < 11) return 2;
        return 1;
    }

    private increaseQuality(amount: number = 1) {
        this.quality = this.quality + amount;
        if (this.quality > 50) {
            this.quality = 50;
        }
    }

    private decreaseQuality() {
        if (this.isSulfuras()) return;

        if (this.quality > 0) {
            this.quality = this.quality - 1;
        }
    }

    private isSulfuras() {
        return this.name == 'Sulfuras, Hand of Ragnaros';
    }

    private isAgedBrie() {
        return this.name == 'Aged Brie';
    }

    private isBackstagePass() {
        return this.name == 'Backstage passes to a TAFKAL80ETC concert';
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.update();
        }

        return this.items;
    }
}
