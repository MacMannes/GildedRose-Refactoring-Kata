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
        if (!this.isAgedBrie() && !this.isBackstagePass()) {
            this.decreaseQuality();
        } else {
            this.increaseQuality();
            if (this.isBackstagePass()) {
                if (this.sellIn < 11) {
                    this.increaseQuality();
                }
                if (this.sellIn < 6) {
                    this.increaseQuality();
                }
            }
        }
        if (!this.isSulfuras()) {
            this.sellIn = this.sellIn - 1;
        }
        if (this.sellIn < 0) {
            if (!this.isAgedBrie()) {
                if (!this.isBackstagePass()) {
                    this.decreaseQuality();
                } else {
                    this.quality = 0;
                }
            } else {
                this.increaseQuality();
            }
        }
    }

    private decreaseQuality() {
        if (this.isSulfuras()) return;

        if (this.quality > 0) {
            this.quality = this.quality - 1;
        }
    }

    private increaseQuality() {
        if (this.quality < 50) {
            this.quality = this.quality + 1;
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
