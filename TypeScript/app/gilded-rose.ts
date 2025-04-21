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
        this.updateSellIn();
        this.updateQuality();
    }

    private updateSellIn() {
        if (this.isSulfuras()) return;

        this.sellIn = this.sellIn - 1;
    }

    private updateQuality() {
        if (this.sellIn < 0 && this.isBackstagePass()) {
            this.quality = 0;
            return;
        }

        if (this.isAgedBrie() || this.isBackstagePass()) {
            const amount = this.computeAmountToIncreaseQuality();
            this.increaseQuality(amount);
            return;
        }

        const amount = this.computeAmountToDecreaseQuality();
        this.decreaseQuality(amount);
    }

    private computeAmountToIncreaseQuality(): number {
        if (this.isBackstagePass() && this.sellIn < 5) return 3;
        if (this.isBackstagePass() && this.sellIn < 10) return 2;

        if (this.sellIn < 0) return 2;

        return 1;
    }

    private computeAmountToDecreaseQuality(): number {
        if (this.sellIn < 0) return 2;

        return 1;
    }

    private increaseQuality(amount: number = 1) {
        this.quality = this.quality + amount;
        if (this.quality > 50) {
            this.quality = 50;
        }
    }

    private decreaseQuality(amount: number = 1) {
        if (this.isSulfuras()) return;

        this.quality = this.quality - amount;

        if (this.quality < 0) {
            this.quality = 0;
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
